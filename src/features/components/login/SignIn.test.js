// src/components/__tests__/SignIn.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import SignIn from './SignIn';

test('renders SignIn form and submits data', () => {
  const mockSubmit = jest.fn();
  render(<SignIn onSubmit={mockSubmit} />);

  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), {
    target: { value: 'password123' },
  });
  fireEvent.click(screen.getByText(/Sign In/i));

  expect(mockSubmit).toHaveBeenCalledWith('test@example.com', 'password123');
});
