import { Task } from '@/types';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TaskCard from '../TaskCard';

const taskMock: Task = {
    id: 1,
    label: 'Task A',
};

describe('TaskCard', () => {
    it('should display a task label, id, assignee icon, and X button icon', () => {
        render(<TaskCard task={taskMock} />);

        expect(screen.getByText('Task A')).toBeInTheDocument();
        expect(screen.getByText(1)).toBeInTheDocument();
        expect(screen.getByText('UA')).toBeInTheDocument();
        expect(screen.getByText('X')).toBeInTheDocument();
    });

    it.todo('should update the task label when the user edits the label and presses enter');

    it.todo('should delete the task card when the X button is clicked');
});
