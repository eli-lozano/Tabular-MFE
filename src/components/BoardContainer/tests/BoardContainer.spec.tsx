import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BoardContainer from '../BoardContainer';

describe('BoardContainer', () => {
    it('contains a board title, board toolbar, and board content', () => {
        render(<BoardContainer />);

        expect(screen.getByText('Board Title')).toBeInTheDocument();
        expect(screen.getByText('Board Toolbar')).toBeInTheDocument();
        expect(screen.getByText('Board Content')).toBeInTheDocument();
    });
});