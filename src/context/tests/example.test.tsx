import { render, screen } from '@testing-library/react';

describe('Example test', () => {
  it('renders a basic element', () => {
    render(<h1>Hello World</h1>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
