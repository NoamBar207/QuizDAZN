import { formatCorrectAnswerTime } from '../state/scoring.ts';
import type { UseQuizReturn } from '../types/quiz';

interface QuizPlayProps {
  quiz: UseQuizReturn;
}

export function QuizPlay({ quiz }: QuizPlayProps) {
  const { questions } = quiz;

  return (
    <section className="quiz-play quiz-play--results" aria-live="polite">
      <h2 className="quiz-play__heading">Quiz Complete</h2>
      <p className="quiz-play__score">
        Score: {quiz.score} / {questions.length}
      </p>
      <p className="quiz-play__bonus">
        Correct answer time: {formatCorrectAnswerTime(quiz.correctAnswerTimeMs)}
      </p>
      <button type="button" className="quiz-play__action" onClick={quiz.playAgain}>
        Play Again
      </button>
    </section>
  );
}
