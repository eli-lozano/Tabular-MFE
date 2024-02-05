import { Task } from '@/types';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskCard from '../TaskCard';

const taskMock: Task = {
    id: 1,
    label: 'Brush my cat',
};

describe('TaskCard', () => {
    it('should display a task label, id, assignee icon, and X button icon', () => {
        render(<TaskCard task={taskMock} />);

        expect(screen.getByText('Brush my cat')).toBeInTheDocument();
        expect(screen.getByText('T-1')).toBeInTheDocument();
        expect(screen.getByTestId('assignee-icon')).toBeInTheDocument();
        expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    });

    it('should update the task label when the user edits the label and clicks away', async () => {
        render(<TaskCard task={taskMock} />);

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

    it('should delete the task card when the X button is clicked', async () => {
        render(<TaskCard task={taskMock} />);

        await userEvent.click(screen.getByRole('button'));

        await waitFor(() => {
            expect(screen.queryByText('T-1')).not.toBeInTheDocument();
        });
    });
});
