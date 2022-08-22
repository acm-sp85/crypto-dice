import { render, screen } from '@testing-library/react';
import { set } from 'lodash';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByTestId('check-bet-cta');

  expect(linkElement).toBeInTheDocument();

});

test('renders bet button', () => {
  render(<App />);

  const setReference = screen.getByTestId('set-reference-button');

  expect(setReference).toBeInTheDocument();
});

test('clicks bet button', () => {
  render(<App />);

  const setReference = screen.getByTestId('set-reference-button');

  expect(setReference).toBeInTheDocument();
});
