import type { QuizState } from '../../quizState.ts';
import { advanceQuestion } from './question.ts';

export function completeReveal(state: QuizState, now = Date.now()): QuizState {
  if (state.phase !== 'revealing') {
    return state;
  }

  return advanceQuestion(state, now);
}
