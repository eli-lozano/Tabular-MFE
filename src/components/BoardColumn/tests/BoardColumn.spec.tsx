import { TASK_STATUS, Task } from '@/types';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import BoardColumn from '../BoardColumn';
import { render } from '@/test/test-utils';

const taskMock: Task = {
    id: 1,
    label: 'Task A',
    status: TASK_STATUS.TO_DO,
};

describe('BoardColumn', () => {
    it('should display the status header', () => {
        render(<BoardColumn header={TASK_STATUS.TO_DO} onDelete={jest.fn()} />);
        expect(screen.getByText(TASK_STATUS.TO_DO.toUpperCase())).toBeInTheDocument();
    });

    it('should display no task cards when there are no tasks in the column', () => {
        render(<BoardColumn header={TASK_STATUS.TO_DO} onDelete={jest.fn()} />);
        expect(screen.queryByTestId('task-card')).not.toBeInTheDocument();
    });

    it('should display task cards when there are tasks in the column', () => {
        render(<BoardColumn header={TASK_STATUS.TO_DO} taskMap={new Map([[taskMock.id, taskMock]])} onDelete={jest.fn()} />);

        expect(screen.getByText(taskMock.label)).toBeInTheDocument();
        expect(screen.getByText('T-1')).toBeInTheDocument();
    });
});
