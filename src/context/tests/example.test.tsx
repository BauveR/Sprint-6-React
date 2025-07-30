/// <reference types="vitest" />
import { render, screen } from '@testing-library/react';

describe('Example test', () => {
  it('renders Hello World', () => {
    render(<h1>Hello World</h1>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
