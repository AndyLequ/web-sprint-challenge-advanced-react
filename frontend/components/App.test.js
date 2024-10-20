import { render, screen, fireEvent } from '@testing-library/react';
import AppFunctional from './AppFunctional';
import '@testing-library/jest-dom/extend-expect'
import React from 'react';

describe('AppFunctional Component', () => {
  beforeEach(() => {
    render(<AppFunctional/>);
  });

  test('renders coordinates and steps headings', () => {
    // Check if the "Coordinates" heading renders
    const coordinatesHeading = screen.getByRole('heading', { name: /coordinates/i });
    expect(coordinatesHeading).toBeInTheDocument();
    
    // Check if the "You moved X time(s)" heading renders
    const stepsHeading = screen.getByRole('heading', { name: /you moved 0 times/i });
    expect(stepsHeading).toBeInTheDocument();
  });

  test('renders control buttons (LEFT, UP, RIGHT, DOWN, reset)', () => {
    // Check if control buttons render correctly
    const leftButton = screen.getByRole('button', { name: /left/i });
    const upButton = screen.getByRole('button', { name: /up/i });
    const rightButton = screen.getByRole('button', { name: /right/i });
    const downButton = screen.getByRole('button', { name: /down/i });
    const resetButton = screen.getByRole('button', { name: /reset/i });

    expect(leftButton).toBeInTheDocument();
    expect(upButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
    expect(downButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  test('renders form inputs (email and submit button)', () => {
    // Check if the email input field renders
    const emailInput = screen.getByPlaceholderText(/type email/i);
    expect(emailInput).toBeInTheDocument();

    // Check if the submit button renders
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  test('updates steps and coordinates when moving the "B"', () => {
    // Initially, coordinates should be at (2, 2) and steps should be 0
    const coordinatesHeading = screen.getByRole('heading', { name: /coordinates \(2, 2\)/i });
    const stepsHeading = screen.getByRole('heading', { name: /you moved 0 times/i });

    expect(coordinatesHeading).toBeInTheDocument();
    expect(stepsHeading).toBeInTheDocument();

    // Simulate clicking the "UP" button
    const upButton = screen.getByRole('button', { name: /up/i });
    fireEvent.click(upButton);

    // After moving up, the coordinates and steps should be updated
    const updatedCoordinatesHeading = screen.getByRole('heading', { name: /coordinates \(2, 1\)/i });
    const updatedStepsHeading = screen.getByRole('heading', { name: /you moved 1 time/i });

    expect(updatedCoordinatesHeading).toBeInTheDocument();
    expect(updatedStepsHeading).toBeInTheDocument();
  });

  

  test('resets the state when reset button is clicked', () => {
    // Simulate clicking the "UP" button to move once
    const upButton = screen.getByRole('button', { name: /up/i });
    fireEvent.click(upButton);

    // Now simulate clicking the "reset" button
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    // Check if coordinates and steps are reset
    const coordinatesHeading = screen.getByRole('heading', { name: /coordinates \(2, 2\)/i });
    const stepsHeading = screen.getByRole('heading', { name: /you moved 0 times/i });

    expect(coordinatesHeading).toBeInTheDocument();
    expect(stepsHeading).toBeInTheDocument();
  });

  test('typing in the email input changes its value', () => {
    const emailInput = screen.getByPlaceholderText(/type email/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    expect(emailInput.value).toBe('test@example.com');
    });
});
