import { HINT_AFTER_SEC } from '../../../types/quiz.ts';
import type { QuizState } from '../../quizState.ts';
import { enterReveal } from './score.ts';

export function tick(state: QuizState): QuizState {
  if (state.phase !== 'questionActive') {
    return state;
  }

  const next = state.timeLeft - 1;

  if (next <= 0) {
    return enterReveal(state);
  }

  return {
    ...state,
    timeLeft: next,
    hintVisible: state.hintVisible || next === HINT_AFTER_SEC,
  };
}
