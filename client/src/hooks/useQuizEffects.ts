import { useEffect, type Dispatch } from 'react';
import type { QuizAction } from '../state/actions.ts';
import type { QuizState } from '../state/quizState.ts';
import { REVEAL_DURATION_MS } from '../types/quiz';

export function useQuizEffects(state: QuizState, dispatch: Dispatch<QuizAction>): void {
  useEffect(() => {
    if (state.phase !== 'questionActive') {
      return;
    }

    const interval = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.phase, state.questionIndex, dispatch]);

  useEffect(() => {
    if (state.phase !== 'revealing') {
      return;
    }

    const timeout = setTimeout(() => {
      dispatch({ type: 'REVEAL_COMPLETE' });
    }, REVEAL_DURATION_MS);

    return () => clearTimeout(timeout);
  }, [state.phase, state.questionIndex, dispatch]);
}
