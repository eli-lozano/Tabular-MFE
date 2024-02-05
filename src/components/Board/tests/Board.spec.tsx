import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Board from '../Board';
import userEvent from '@testing-library/user-event';

describe('Board', () => {
    it('contains a board title, board toolbar, and board content', () => {
        render(<Board />);

        expect(screen.getByText('Tabular.io')).toBeInTheDocument();
        expect(screen.getByTestId('board-toolbar')).toBeInTheDocument();
        expect(screen.getByTestId('board-content')).toBeInTheDocument();
    });

    // TODO: after we hydrate the board with gSSP, revise this test to accomodate 
    it('should delete a task from the board when the user clicks the X button on a task card', async () => {
        render(<Board />);

        await userEvent.click(screen.getAllByRole('button', { name: 'delete' })[0]);
        expect(screen.queryByText('T-1')).not.toBeInTheDocument();
    });
});