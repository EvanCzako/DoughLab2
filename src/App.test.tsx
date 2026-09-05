import { render, screen } from '@testing-library/react';
import App from './App';

/* The default CRA test that shipped here looked for a "learn react" link that
 * this app has never had, so `npm test` failed from the first commit. */
test('renders the page heading and the project links', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: /evan czako/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^DoughLoops/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^ChordFinder/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^SynthPutty/ })).toBeInTheDocument();
});
