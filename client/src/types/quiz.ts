// --- API ---

export interface QuizQuestionResponse {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
}

export interface QuizResponse {
  questions: QuizQuestionResponse[];
}

// --- Hook constants ---

export const QUESTION_DURATION_SEC = 20;
export const HINT_AFTER_SEC = 10;
export const REVEAL_DURATION_MS = 1000;

// --- Hook types ---

export type QuizPhase = 'idle' | 'loading' | 'questionActive' | 'revealing' | 'results';

export type StartScreenStatus = 'idle' | 'loading' | 'error';

export interface UseQuizReturn {
  phase: QuizPhase;
  questions: QuizQuestionResponse[];
  currentQuestionIndex: number;
  currentQuestion: QuizQuestionResponse | null;
  timeLeft: number;
  hintVisible: boolean;
  selectedIndex: number | null;
  score: number;
  correctAnswerTimeMs: number;
  errorMessage: string | null;
  startStatus: StartScreenStatus;
  startQuiz: () => Promise<void>;
  selectAnswer: (index: number) => void;
  playAgain: () => void;
}
