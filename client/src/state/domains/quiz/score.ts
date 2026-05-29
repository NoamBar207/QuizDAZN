import { computeQuestionScore } from '../../scoring.ts';
import type { QuizState } from '../../quizState.ts';

export function applyQuestionScore(state: QuizState): QuizState {
  const question = state.questions[state.questionIndex];
  if (!question) {
    return state;
  }

  const result = computeQuestionScore(
    state.selectedIndex,
    question.correctIndex,
    state.selectedAtMs,
    state.questionStartedAtMs,
  );

  if (!result.isCorrect) {
    return state;
  }

  return {
    ...state,
    score: state.score + 1,
    correctAnswerTimeMs: state.correctAnswerTimeMs + result.timeMs,
  };
}

export function enterReveal(state: QuizState): QuizState {
  if (state.phase !== 'questionActive') {
    return state;
  }

  return {
    ...applyQuestionScore(state),
    phase: 'revealing',
    timeLeft: 0,
  };
}
