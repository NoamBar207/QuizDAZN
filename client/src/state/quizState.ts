import { QUESTION_DURATION_SEC, type QuizPhase, type QuizQuestionResponse } from '../types/quiz';

export interface QuizState {
  phase: QuizPhase;
  questions: QuizQuestionResponse[];
  questionIndex: number;
  timeLeft: number;
  hintVisible: boolean;
  selectedIndex: number | null;
  selectedAtMs: number | null;
  questionStartedAtMs: number;
  score: number;
  correctAnswerTimeMs: number;
  errorMessage: string | null;
}

export function createRoundState(now = Date.now()): Pick<
  QuizState,
  'timeLeft' | 'hintVisible' | 'selectedIndex' | 'selectedAtMs' | 'questionStartedAtMs'
> {
  return {
    timeLeft: QUESTION_DURATION_SEC,
    hintVisible: false,
    selectedIndex: null,
    selectedAtMs: null,
    questionStartedAtMs: now,
  };
}

export const initialQuizState: QuizState = {
  phase: 'idle',
  questions: [],
  questionIndex: 0,
  ...createRoundState(0),
  score: 0,
  correctAnswerTimeMs: 0,
  errorMessage: null,
};
