import { TASK_STATUS, Task } from '@/types';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskCard from '../TaskCard';

const taskMock: Task = {
    id: 1,
    label: 'Brush my cat',
    status: TASK_STATUS.IN_PROGRESS,
};

describe('TaskCard', () => {
    it('should display a task label, id, assignee icon, and X button icon', () => {
        render(<TaskCard task={taskMock} onDelete={jest.fn()} />);

        expect(screen.getByText(taskMock.label)).toBeInTheDocument();
        expect(screen.getByText(`T-${taskMock.id}`)).toBeInTheDocument();
        expect(screen.getByTestId('assignee-icon')).toBeInTheDocument();
        expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    });

    it('should update the task label when the user edits the label and clicks away', async () => {
        render(<TaskCard task={taskMock} onDelete={jest.fn()} />);

        const textField = screen.getByRole('textbox');
        await userEvent.clear(textField);
        await userEvent.type(textField, 'Generate expense report');

        await waitFor(() => {
            textField.blur();
        });

        await waitFor(() => {
            expect(textField).toHaveValue('Generate expense report');
        });
    });

    it('should render an assignee icon with their initials when there is an assignee to a task', () => {
        render(<TaskCard task={{ ...taskMock, assignee: { name: 'Jon Snow' } }} onDelete={jest.fn()} />);
        expect(screen.getByText('JS')).toBeInTheDocument();
    });

    it('should call onDelete when the X button is clicked', async () => {
        const handleDeleteMock = jest.fn();
        render(<TaskCard task={taskMock} onDelete={handleDeleteMock} />);

        await userEvent.click(screen.getByRole('button'));
        expect(handleDeleteMock).toHaveBeenCalledWith(taskMock);
    });
});
