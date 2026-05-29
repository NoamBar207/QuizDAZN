import { Router, type Request, type Response } from 'express';
import { Question } from '../models/Question.js';
import type { IQuestion } from '../models/Question.js';
import type { QuizQuestionResponse, QuizResponse } from '../types/quiz.js';

const QUIZ_SIZE = 5;

const router = Router();

function toQuizQuestion(doc: IQuestion | Record<string, unknown>): QuizQuestionResponse {
  const id =
    typeof doc._id === 'object' && doc._id !== null && 'toString' in doc._id
      ? String(doc._id.toString())
      : String(doc._id);

  return {
    id,
    question: doc.question as string,
    options: doc.options as string[],
    correctIndex: doc.correctIndex as number,
    hint: doc.hint as string,
  };
}

router.get('/quiz', async (_req: Request, res: Response) => {
  try {
    const total = await Question.countDocuments();

    if (total === 0) {
      res.status(503).json({ error: 'No questions available. Run npm run seed first.' });
      return;
    }

    const sampleSize = Math.min(QUIZ_SIZE, total);

    if (sampleSize < QUIZ_SIZE) {
      console.warn(
        `Only ${total} questions in database; returning ${sampleSize} instead of ${QUIZ_SIZE}.`
      );
    }

    const questions = await Question.aggregate<IQuestion>([
      { $sample: { size: sampleSize } },
    ]);

    const response: QuizResponse = {
      questions: questions.map(toQuizQuestion),
    };

    res.json(response);
  } catch (err) {
    console.error('Failed to fetch quiz questions:', err);
    res.status(500).json({ error: 'Failed to fetch quiz questions' });
  }
});

export default router;
