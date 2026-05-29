import type { QuizPhase } from '../types/quiz';
import {
  getOptionAriaLabel,
  getOptionClassName,
  handleOptionsListKeyDown,
} from '../helpers/optionsListHelpers';

interface OptionsListProps {
  options: string[];
  optionKeyPrefix: string;
  selectedIndex: number | null;
  correctIndex: number;
  phase: QuizPhase;
  onSelect: (index: number) => void;
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
    <ul
      className="options-list"
      role="group"
      aria-label="Answer choices"
      onKeyDown={(event) => handleOptionsListKeyDown(event, isLocked)}
    >
      {options.map((option, index) => (
        <li key={`${optionKeyPrefix}-${index}`} className="options-list__item">
          <button
            type="button"
            className={getOptionClassName(index, selectedIndex, correctIndex, phase)}
            onClick={() => onSelect(index)}
            disabled={isLocked}
            aria-pressed={selectedIndex === index}
            aria-label={getOptionAriaLabel(option, index, selectedIndex, correctIndex, phase)}
          >
            {option}
          </button>
        </li>
      ))}
    </ul>
  );
}
