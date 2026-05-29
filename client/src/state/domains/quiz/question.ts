import type { QuizQuestionResponse } from '../../../types/quiz.ts';
import { createRoundState, type QuizState } from '../../quizState.ts';

export function getCurrentQuestion(state: QuizState): QuizQuestionResponse | null {
  return state.questions[state.questionIndex] ?? null;
}

export function advanceQuestion(state: QuizState, now = Date.now()): QuizState {
  const isLastQuestion = state.questionIndex >= state.questions.length - 1;

  if (isLastQuestion) {
    return {
      ...state,
      phase: 'results',
    };
  }

  return {
    ...state,
    phase: 'questionActive',
    questionIndex: state.questionIndex + 1,
    ...createRoundState(now),
  };
}
