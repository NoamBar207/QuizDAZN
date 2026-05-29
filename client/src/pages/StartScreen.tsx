import type { StartScreenStatus } from '../types/quiz';

export type { StartScreenStatus };

interface StartScreenProps {
  onStart: () => void;
  status: StartScreenStatus;
  errorMessage?: string | null;
}

export function StartScreen({ onStart, status, errorMessage }: StartScreenProps) {
  const isLoading = status === 'loading';
  const hasError = status === 'error';

  return (
    <section className="start-screen" aria-labelledby="quiz-title">
      <div className="start-screen__ornament" aria-hidden="true">
        SPQR
      </div>

      <h1 id="quiz-title" className="start-screen__title">
        Ancient Rome Quiz
      </h1>

      <p className="start-screen__subtitle">
        Test your knowledge of the Roman Empire — five questions, twenty seconds each.
      </p>

      {hasError && errorMessage && (
        <p className="start-screen__error" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="button"
        className="start-screen__button"
        onClick={onStart}
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? 'Loading questions…' : hasError ? 'Try Again' : 'Start Quiz'}
      </button>
    </section>
  );
}
