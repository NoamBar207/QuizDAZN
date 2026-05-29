import { useCallback, useReducer } from 'react';
import { fetchQuiz } from '../api/quizApi';
import { getCurrentQuestion } from '../state/domains/quiz/question.ts';
import { quizReducer } from '../state/reducer.ts';
import { initialQuizState } from '../state/quizState.ts';
import type { StartScreenStatus, UseQuizReturn } from '../types/quiz';
import { useQuizEffects } from './useQuizEffects';

export function useQuiz(): UseQuizReturn {
  const [state, dispatch] = useReducer(quizReducer, initialQuizState);

  useQuizEffects(state, dispatch);

  const startQuiz = useCallback(async () => {
    dispatch({ type: 'START_QUIZ' });

    try {
      const data = await fetchQuiz();
      dispatch({ type: 'START_QUIZ_SUCCESS', questions: data.questions });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to load quiz. Please try again.';
      dispatch({ type: 'START_QUIZ_ERROR', message });
    }
  }, []);

  const selectAnswer = useCallback((index: number) => {
    dispatch({ type: 'SELECT_ANSWER', index, atMs: Date.now() });
  }, []);

  const playAgain = useCallback(() => {
    dispatch({ type: 'PLAY_AGAIN' });
  }, []);

  const startStatus: StartScreenStatus =
    state.phase === 'loading' ? 'loading' : state.errorMessage ? 'error' : 'idle';

  return {
    phase: state.phase,
    questions: state.questions,
    currentQuestionIndex: state.questionIndex,
    currentQuestion: getCurrentQuestion(state),
    timeLeft: state.timeLeft,
    hintVisible: state.hintVisible,
    selectedIndex: state.selectedIndex,
    score: state.score,
    correctAnswerTimeMs: state.correctAnswerTimeMs,
    errorMessage: state.errorMessage,
    startStatus,
    startQuiz,
    selectAnswer,
    playAgain,
  };
}

export type { QuizPhase, StartScreenStatus, UseQuizReturn } from '../types/quiz';
