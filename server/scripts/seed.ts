import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { connectDB, disconnectDB } from '../src/config/db.js';
import { Question } from '../src/models/Question.js';
import type { QuestionInput } from '../src/types/question.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, '../data/questions.json');

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function validateQuestion(entry: unknown, index: number): QuestionInput {
  const label = `Question at index ${index}`;

  if (!isRecord(entry)) {
    throw new Error(`${label} must be an object`);
  }

  const { question, options, correctIndex, hint } = entry;

  if (typeof question !== 'string' || question.trim() === '') {
    throw new Error(`${label}: "question" must be a non-empty string`);
  }

  if (!Array.isArray(options) || options.length < 2 || options.length > 4) {
    throw new Error(`${label}: "options" must be an array of 2 to 4 strings`);
  }

  if (!options.every((option) => typeof option === 'string' && option.trim() !== '')) {
    throw new Error(`${label}: every option must be a non-empty string`);
  }

  if (typeof correctIndex !== 'number' || !Number.isInteger(correctIndex)) {
    throw new Error(`${label}: "correctIndex" must be an integer`);
  }

  if (correctIndex < 0 || correctIndex >= options.length) {
    throw new Error(
      `${label}: "correctIndex" must be a valid index into "options"`
    );
  }

  if (typeof hint !== 'string' || hint.trim() === '') {
    throw new Error(`${label}: "hint" must be a non-empty string`);
  }

  return {
    question: question.trim(),
    options: options.map((option) => option.trim()),
    correctIndex,
    hint: hint.trim(),
  };
}

function loadQuestions(): QuestionInput[] {
  let raw: unknown;

  try {
    raw = JSON.parse(readFileSync(DATA_PATH, 'utf-8'));
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to read or parse ${DATA_PATH}: ${message}`);
  }

  if (!Array.isArray(raw)) {
    throw new Error(`${DATA_PATH} must contain a JSON array`);
  }

  if (raw.length === 0) {
    throw new Error(`${DATA_PATH} is empty — add questions before seeding`);
  }

  return raw.map((entry, index) => validateQuestion(entry, index));
}

async function seed(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      'MONGODB_URI is not set. Copy .env.example to .env and configure it.'
    );
  }

  const questions = loadQuestions();
  console.log(`Loaded ${questions.length} questions from ${DATA_PATH}`);

  await connectDB(uri);

  try {
    const { deletedCount } = await Question.deleteMany({});
    const inserted = await Question.insertMany(questions);
    console.log(
      `Seed complete: inserted ${inserted.length} questions (removed ${deletedCount ?? 0} existing).`
    );
  } finally {
    await disconnectDB();
  }
}

seed().catch((err: unknown) => {
  console.error('Seed failed:', err instanceof Error ? err.message : err);
  process.exit(1);
});
