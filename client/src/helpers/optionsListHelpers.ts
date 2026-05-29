import type { KeyboardEvent } from 'react';
import type { QuizPhase } from '../types/quiz';

export function getOptionClassName(
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

export function getOptionAriaLabel(
  option: string,
  index: number,
  selectedIndex: number | null,
  correctIndex: number,
  phase: QuizPhase,
): string | undefined {
  if (phase !== 'revealing') {
    return undefined;
  }

  if (index === correctIndex) {
    return `${option}, correct answer`;
  }

  if (index === selectedIndex) {
    return `${option}, your answer, incorrect`;
  }

  return undefined;
}

export function handleOptionsListKeyDown(
  event: KeyboardEvent<HTMLUListElement>,
  isLocked: boolean,
): void {
  if (isLocked) {
    return;
  }

  const { key } = event;
  if (key !== 'ArrowDown' && key !== 'ArrowUp' && key !== 'Home' && key !== 'End') {
    return;
  }

  event.preventDefault();

  const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>(
    '.options-list__option:not(:disabled)',
  );
  const focusedIndex = Array.from(buttons).findIndex((button) => button === document.activeElement);

  if (buttons.length === 0) {
    return;
  }

  let nextIndex = focusedIndex;

  if (key === 'Home') {
    nextIndex = 0;
  } else if (key === 'End') {
    nextIndex = buttons.length - 1;
  } else if (key === 'ArrowDown') {
    nextIndex = focusedIndex < buttons.length - 1 ? focusedIndex + 1 : 0;
  } else if (key === 'ArrowUp') {
    nextIndex = focusedIndex > 0 ? focusedIndex - 1 : buttons.length - 1;
  }

  if (nextIndex < 0) {
    nextIndex = 0;
  }

  buttons[nextIndex]?.focus();
}
