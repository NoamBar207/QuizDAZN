import type { QuizPhase } from '../types/quiz';

interface OptionsListProps {
  options: string[];
  optionKeyPrefix: string;
  selectedIndex: number | null;
  correctIndex: number;
  phase: QuizPhase;
  onSelect: (index: number) => void;
}

function getOptionClassName(
  index: number,
  selectedIndex: number | null,
  correctIndex: number,
  phase: QuizPhase,
): string {
  const classes = ['options-list__option'];

  if (phase === 'revealing') {
    if (index === correctIndex) {
      classes.push('options-list__option--correct');
    } else if (index === selectedIndex) {
      classes.push('options-list__option--incorrect');
    }
  } else if (index === selectedIndex) {
    classes.push('options-list__option--selected');
  }

  return classes.join(' ');
}

export function OptionsList({
  options,
  optionKeyPrefix,
  selectedIndex,
  correctIndex,
  phase,
  onSelect,
}: OptionsListProps) {
  const isLocked = phase === 'revealing';

  return (
    <ul className="options-list" role="list">
      {options.map((option, index) => (
        <li key={`${optionKeyPrefix}-${index}`} className="options-list__item">
          <button
            type="button"
            className={getOptionClassName(index, selectedIndex, correctIndex, phase)}
            onClick={() => onSelect(index)}
            disabled={isLocked}
            aria-pressed={selectedIndex === index}
          >
            {option}
          </button>
        </li>
      ))}
    </ul>
  );
}
