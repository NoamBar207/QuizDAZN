import { QUESTION_DURATION_SEC } from '../types/quiz';

export interface QuestionScoreResult {
  isCorrect: boolean;
  timeMs: number;
}

export function computeQuestionScore(
  selectedIndex: number | null,
  correctIndex: number,
  selectedAtMs: number | null,
  questionStartMs: number,
  questionDurationMs: number = QUESTION_DURATION_SEC * 1000,
): QuestionScoreResult {
  const isCorrect = selectedIndex !== null && selectedIndex === correctIndex;

  if (!isCorrect || selectedAtMs === null) {
    return { isCorrect: false, timeMs: 0 };
  }

  const elapsed = selectedAtMs - questionStartMs;

  if (elapsed < 0 || elapsed >= questionDurationMs) {
    return { isCorrect: true, timeMs: 0 };
  }

  return { isCorrect: true, timeMs: elapsed };
}

export function formatCorrectAnswerTime(ms: number): string {
  return `${(ms / 1000).toFixed(1)}s`;
}
