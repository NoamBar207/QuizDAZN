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
