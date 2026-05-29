import type { QuizAction } from './actions.ts';
import {
  completeReveal,
  playAgain,
  selectAnswer,
  startQuiz,
  startQuizError,
  startQuizSuccess,
  tick,
} from './domains/quiz/index.ts';
import type { QuizState } from './quizState.ts';

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START_QUIZ':
      return startQuiz(state);
    case 'START_QUIZ_SUCCESS':
      return startQuizSuccess(state, action.questions);
    case 'START_QUIZ_ERROR':
      return startQuizError(state, action.message);
    case 'TICK':
      return tick(state);
    case 'SELECT_ANSWER':
      return selectAnswer(state, action.index, action.atMs);
    case 'REVEAL_COMPLETE':
      return completeReveal(state);
    case 'PLAY_AGAIN':
      return playAgain();
    default:
      return state;
  }
}
