import type { QuizQuestionResponse } from '../../../types/quiz.ts';
import { createRoundState, initialQuizState, type QuizState } from '../../quizState.ts';

export function startQuiz(state: QuizState): QuizState {
  return {
    ...state,
    phase: 'loading',
    errorMessage: null,
  };
}

export function startQuizSuccess(
  state: QuizState,
  questions: QuizQuestionResponse[],
  now = Date.now(),
): QuizState {
  return {
    ...state,
    phase: 'questionActive',
    questions,
    questionIndex: 0,
    score: 0,
    correctAnswerTimeMs: 0,
    errorMessage: null,
    ...createRoundState(now),
  };
}

export function startQuizError(state: QuizState, message: string): QuizState {
  return {
    ...state,
    phase: 'idle',
    errorMessage: message,
  };
}

export function playAgain(): QuizState {
  return initialQuizState;
}
