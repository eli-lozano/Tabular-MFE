import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Board from '../Board';

describe('Board', () => {
    it('contains a board title, board toolbar, and board content', () => {
        render(<Board />);

        expect(screen.getByText('Tabular.io')).toBeInTheDocument();
        expect(screen.getByTestId('board-toolbar')).toBeInTheDocument();
        expect(screen.getByTestId('board-content')).toBeInTheDocument();
    });
});