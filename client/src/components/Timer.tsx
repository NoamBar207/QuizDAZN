import { QUESTION_DURATION_SEC } from '../types/quiz';

interface TimerProps {
  timeLeft: number;
  durationSec?: number;
}

export function Timer({ timeLeft, durationSec = QUESTION_DURATION_SEC }: TimerProps) {
  const progress = Math.max(0, Math.min(100, (timeLeft / durationSec) * 100));

  return (
    <div className="timer" aria-live="polite" aria-label={`${timeLeft} seconds remaining`}>
      <span className="timer__value">{timeLeft}s</span>
      <div className="timer__track" role="presentation" aria-hidden="true">
        <div className="timer__fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
