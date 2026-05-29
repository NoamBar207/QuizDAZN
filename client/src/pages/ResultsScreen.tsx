import { useEffect, useRef } from 'react';
import { formatCorrectAnswerTime } from '../state/scoring.ts';
import type { UseQuizReturn } from '../types/quiz';

interface ResultsScreenProps {
  quiz: UseQuizReturn;
}

export function ResultsScreen({ quiz }: ResultsScreenProps) {
  const { questions } = quiz;
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section className="results-screen" aria-labelledby="results-heading">
      <div className="results-screen__ornament" aria-hidden="true">
        SPQR
      </div>

      <h2
        id="results-heading"
        ref={headingRef}
        tabIndex={-1}
        className="results-screen__heading"
      >
        Quiz Complete
      </h2>

      <div className="results-screen__stats" aria-live="polite">
        <p className="results-screen__score">
          Score: <strong>{quiz.score}</strong> / {questions.length}
        </p>
        <p className="results-screen__bonus">
          Correct answer time:{' '}
          <strong>{formatCorrectAnswerTime(quiz.correctAnswerTimeMs)}</strong>
        </p>
      </div>

      <button type="button" className="results-screen__button" onClick={quiz.playAgain}>
        Play Again
      </button>
    </section>
  );
}
