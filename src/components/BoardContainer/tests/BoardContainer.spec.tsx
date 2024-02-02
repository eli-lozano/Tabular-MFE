import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BoardContainer from '../BoardContainer';

describe('BoardContainer', () => {
    it('contains a board title, board toolbar, and board content', () => {
        render(<BoardContainer />);

        expect(screen.getByText('Tabular.io')).toBeInTheDocument();
        expect(screen.getByTestId('board-toolbar')).toBeInTheDocument();
        expect(screen.getByTestId('board-content')).toBeInTheDocument();
    });
});