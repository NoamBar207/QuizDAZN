interface QuestionCardProps {
  question: string;
  hint: string;
  hintVisible: boolean;
}

export function QuestionCard({ question, hint, hintVisible }: QuestionCardProps) {
  return (
    <article className="question-card">
      <h2 className="question-card__question">{question}</h2>
      <p
        className={`question-card__hint${hintVisible ? ' question-card__hint--visible' : ''}`}
        aria-live="polite"
      >
        {hintVisible ? hint : '\u00A0'}
      </p>
    </article>
  );
}
