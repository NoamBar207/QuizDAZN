import type { QuizQuestionResponse } from '../types/quiz';

export type QuizAction =
  | { type: 'START_QUIZ' }
  | { type: 'START_QUIZ_SUCCESS'; questions: QuizQuestionResponse[] }
  | { type: 'START_QUIZ_ERROR'; message: string }
  | { type: 'TICK' }
  | { type: 'SELECT_ANSWER'; index: number; atMs: number }
  | { type: 'REVEAL_COMPLETE' }
  | { type: 'PLAY_AGAIN' };
