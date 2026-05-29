import { StartScreen } from './pages/StartScreen';
import { QuizPlay } from './pages/QuizPlay';
import { QuizScreen } from './pages/QuizScreen';
import { useQuiz } from './hooks/useQuiz';

function App() {
  const quiz = useQuiz();
  const showStartScreen = quiz.phase === 'idle' || quiz.phase === 'loading';

  return (
    <div className="app">
      <main className="app-shell">
        {showStartScreen ? (
          <StartScreen
            onStart={quiz.startQuiz}
            status={quiz.startStatus}
            errorMessage={quiz.errorMessage}
          />
        ) : quiz.phase === 'results' ? (
          <QuizPlay quiz={quiz} />
        ) : (
          <QuizScreen quiz={quiz} />
        )}
      </main>
    </div>
  );
}

export default App;
