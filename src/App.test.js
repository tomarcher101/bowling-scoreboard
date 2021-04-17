import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

// test can only add 2 players

// can't choose same colour twice

// can't choose same name twice

// can remove player

// can't start game without at least 1 player

