import { render, fireEvent, screen } from '@testing-library/react';
import Results from './Results';

test('displays something', () => {
  render(<Results />);

  const button = screen.getByTestId('try-again-cta');

  expect(button).exist()
});
