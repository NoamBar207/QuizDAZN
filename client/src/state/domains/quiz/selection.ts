import type { QuizState } from '../../quizState.ts';

export function selectAnswer(state: QuizState, index: number, atMs: number): QuizState {
  if (state.phase !== 'questionActive') {
    return state;
  }

  return {
    ...state,
    selectedIndex: index,
    selectedAtMs: atMs,
  };
}
