import { TASK_STATUS, Task } from '@/types';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BoardColumn from '../BoardColumn';

const taskMock: Task = {
    id: 1,
    label: 'Task A',
    status: TASK_STATUS.TO_DO,
};

describe('BoardColumn', () => {
    it('should display the status header', () => {
        render(<BoardColumn header={TASK_STATUS.TO_DO} />);
        expect(screen.getByText(TASK_STATUS.TO_DO.toUpperCase())).toBeInTheDocument();
    });

    it('should display no task cards when there are no tasks in the column', () => {
        render(<BoardColumn header={TASK_STATUS.TO_DO} tasks={[]} />);
        expect(screen.queryByTestId('task-card')).not.toBeInTheDocument();
    });

    it('should display task cards when there are tasks in the column', () => {
        render(<BoardColumn header={TASK_STATUS.TO_DO} tasks={[taskMock]} />);

        expect(screen.getByText('Task A')).toBeInTheDocument();
        expect(screen.getByText('T-1')).toBeInTheDocument();
    });

    it.todo('should have a backdrop that is longer than the length of all cards within it');
});
