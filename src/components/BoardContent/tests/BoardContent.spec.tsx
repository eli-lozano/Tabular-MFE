import { TASK_STATUS } from '@/types';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import BoardContent from '../BoardContent';
import { MockTaskState } from '@/test-utils/mocks/task-mocks';

describe('BoardContent', () => {
    it.each([TASK_STATUS.TO_DO,
    TASK_STATUS.IN_PROGRESS,
    TASK_STATUS.READY_FOR_QA,
    TASK_STATUS.READY_TO_DEPLOY,
    TASK_STATUS.DONE])('should render column/section: %s', (status: TASK_STATUS) => {
        render(<BoardContent taskState={MockTaskState} />);
        expect(screen.getByText(status.toUpperCase())).toBeInTheDocument();
    });
});
