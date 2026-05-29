import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import quizRouter from './routes/quiz.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', quizRouter);

app.get('/api/health', (_req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus =
    dbState === 1 ? 'connected' : dbState === 2 ? 'connecting' : 'disconnected';

  res.json({
    status: 'ok',
    db: dbStatus,
  });
});

async function start(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error(
      'MONGODB_URI is not set. Copy .env.example to .env and configure it.'
    );
    process.exit(1);
  }

  await connectDB(uri);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start().catch((err: unknown) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
