import type { QuizResponse } from '../types/quiz';

export class QuizApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'QuizApiError';
    this.status = status;
  }
}

export async function fetchQuiz(): Promise<QuizResponse> {
  const response = await fetch('/api/quiz');

  if (!response.ok) {
    let message = 'Failed to load quiz. Please try again.';

    try {
      const body = (await response.json()) as { error?: string };
      if (body.error) {
        message = body.error;
      }
    } catch {
      // Response body is not JSON — keep default message.
    }

    throw new QuizApiError(message, response.status);
  }

  return response.json() as Promise<QuizResponse>;
}
