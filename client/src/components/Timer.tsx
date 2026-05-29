import { QUESTION_DURATION_SEC } from '../types/quiz';

interface TimerProps {
  timeLeft: number;
  durationSec?: number;
}

export function Timer({ timeLeft, durationSec = QUESTION_DURATION_SEC }: TimerProps) {
  const progress = Math.max(0, Math.min(100, (timeLeft / durationSec) * 100));

  return (
    <div className="timer">
      <span className="timer__value" aria-live="polite" aria-atomic="true">
        {timeLeft}s
      </span>
      <div
        className="timer__track"
        role="progressbar"
        aria-valuenow={timeLeft}
        aria-valuemin={0}
        aria-valuemax={durationSec}
        aria-label="Time remaining"
      >
        <div className="timer__fill" style={{ width: `${progress}%` }} aria-hidden="true" />
      </div>
    </div>
  );
}
