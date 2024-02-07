import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
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

    it('should update a task on the board when the user updates the task and clicks away', async () => {
        render(<Board />);

        const textbox = screen.getAllByRole('textbox')[0];
        await userEvent.clear(textbox);
        await userEvent.type(textbox, 'Get clothes tailored');

        await waitFor(() => {
            textbox.blur()
        });

        expect(screen.getByText('Get clothes tailored')).toBeInTheDocument();
    });

    it('should update a task assignee when the user assigns a team member to a task', async () => {
        render(<Board />);

        expect(screen.getAllByTestId('unassigned-icon')[0]).toBeInTheDocument();

        const assigneeButtons = screen.getAllByRole('button', { name: 'select-assignee' });
        await userEvent.click(assigneeButtons[0]);

        const menu = screen.getByRole('menu');
        expect(menu).toBeInTheDocument();

        await userEvent.click(screen.getAllByRole('menuitem')[1]);

        await waitFor(() => {
            expect(screen.getAllByText('EL')[1]).toBeInTheDocument();
        });
    });

    it('should create a new task when the create button is pressed', async () => {
        render(<Board />);

        expect(screen.getAllByRole('textbox')).toHaveLength(7);
        await userEvent.click(screen.getByRole('button', { name: 'Create' }));
        expect(screen.getAllByRole('textbox')).toHaveLength(8);
    });
});