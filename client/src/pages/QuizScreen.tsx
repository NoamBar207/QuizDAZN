import { OptionsList } from '../components/OptionsList';
import { QuestionCard } from '../components/QuestionCard';
import { Timer } from '../components/Timer';
import type { UseQuizReturn } from '../types/quiz';

interface QuizScreenProps {
  quiz: UseQuizReturn;
}

export function QuizScreen({ quiz }: QuizScreenProps) {
  const { currentQuestion, currentQuestionIndex, questions } = quiz;

  if (!currentQuestion) {
    return null;
  }

  return (
    <section className="quiz-screen" aria-live="polite">
      <header className="quiz-screen__header">
        <span className="quiz-screen__progress">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        <Timer timeLeft={quiz.timeLeft} />
      </header>

      <QuestionCard
        question={currentQuestion.question}
        hint={currentQuestion.hint}
        hintVisible={quiz.hintVisible}
      />

      <OptionsList
        options={currentQuestion.options}
        optionKeyPrefix={currentQuestion.id}
        selectedIndex={quiz.selectedIndex}
        correctIndex={currentQuestion.correctIndex}
        phase={quiz.phase}
        onSelect={quiz.selectAnswer}
      />
    </section>
  );
}
