import { TASK_STATUS, Task } from '@/types';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BoardStatusColumn from '../BoardStatusColumn';

const taskMock: Task = {
    id: 1,
    label: 'Task A'
};

describe('BoardStatusColumn', () => {
    it('should display the status header', () => {
        render(<BoardStatusColumn header={TASK_STATUS.TO_DO} />);
        expect(screen.getByText(TASK_STATUS.TO_DO.toUpperCase())).toBeInTheDocument();
    });

    it('should display no task cards when there are no tasks in the column', () => {
        render(<BoardStatusColumn header={TASK_STATUS.TO_DO} tasks={[]} />);
        expect(screen.queryByTestId('task-card')).not.toBeInTheDocument();
    });

    it('should display task cards when there are tasks in the column', () => {
        render(<BoardStatusColumn header={TASK_STATUS.TO_DO} tasks={[taskMock]} />);

        expect(screen.getByText('Task A')).toBeInTheDocument();
        expect(screen.getByText('T-1')).toBeInTheDocument();
    });
});
