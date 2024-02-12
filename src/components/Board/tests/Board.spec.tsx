import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import Board from '../Board';
import userEvent from '@testing-library/user-event';
import { MockSerializedTaskState } from '@/test/mocks/task-mocks';
import { MAX_TASK_ID_MOCK, MOBILE_VIEW_MESSAGE } from '@/common/constants';
import { useMediaQuery } from '@mui/material';

const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
Object.defineProperty(window, "localStorage", {
    value: {
        getItem: (...args: string[]) => mockGetItem(...args),
        setItem: (...args: string[]) => mockSetItem(...args),
    },
});

jest.mock('@mui/material', () => ({
    ...jest.requireActual("@mui/material"),
    useMediaQuery: jest.fn().mockReturnValue(true),
}));

const useMediaQueryMock = useMediaQuery as jest.Mock;

describe('Board', () => {
    it('contains a board title, board toolbar, and board content', () => {
        render(<Board />);

        expect(screen.getByText('Tabular.io')).toBeInTheDocument();
        expect(screen.getByTestId('board-toolbar')).toBeInTheDocument();
        expect(screen.getByTestId('board-content')).toBeInTheDocument();
    });

    it('should set taskState and maxTaskId in local storage when save button is pressed', async () => {
        render(<Board />);

        await userEvent.click(screen.getByRole('button', { name: 'Save' }));

        expect(mockSetItem).toHaveBeenCalledWith('taskState', MockSerializedTaskState);
        expect(mockSetItem).toHaveBeenCalledWith('maxTaskId', MAX_TASK_ID_MOCK.toString());
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

    it('should create a new task when the create button is pressed', async () => {
        render(<Board />);

        expect(screen.getAllByRole('textbox')).toHaveLength(7);
        await userEvent.click(screen.getByRole('button', { name: 'Create' }));
        expect(screen.getAllByRole('textbox')).toHaveLength(8);
    });

    it('should clear the board of all tasks when clear button is pressed', async () => {
        render(<Board />);

        await userEvent.click(screen.getByRole('button', { name: 'Clear' }));

        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });

    it('should render mobile view not supported when on mobile view', () => {
        useMediaQueryMock.mockReturnValue(false);
        render(<Board />);

        expect(screen.getByText(MOBILE_VIEW_MESSAGE)).toBeInTheDocument();
    });
});
