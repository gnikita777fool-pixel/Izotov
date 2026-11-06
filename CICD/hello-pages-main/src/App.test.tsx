import { describe, it, expect } from 'vitest'; import { render, screen } from '@testing-library/react'; import App from './App';
describe('App', () => {
  it('renders header', () => { render(<App />); expect(screen.getByRole('heading', { level: 1, name: /Hello Pages/i })).toBeInTheDocument(); });
  it('renders about', () => { render(<App />); expect(screen.getByRole('heading', { level: 2, name: /О проекте/i })).toBeInTheDocument(); });
})
