import { TASK_STATUS, Task } from '@/types';
import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskCard from '../TaskCard';
import { render } from '@/test/test-utils';
import { DroppableProvided, DroppableStateSnapshot, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import { ReactNode } from 'react';
import { teamMemberMock } from '@/test/mocks/team-member-mocks';

jest.mock('@hello-pangea/dnd', () => ({
    Droppable: ({ children }: { children: (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => ReactNode }) =>
        children({
            droppableProps: {
                'data-rfd-droppable-context-id': '1',
                'data-rfd-droppable-id': '2',
            },
            innerRef: jest.fn(),
            placeholder: null
        }, {
            isDraggingOver: false,
            draggingOverWith: null,
            draggingFromThisWith: null,
            isUsingPlaceholder: false
        }),
    Draggable: ({ children }: { children: (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => ReactNode }) =>
        children({
            draggableProps: {
                style: undefined,
                "data-rfd-draggable-context-id": "1",
                "data-rfd-draggable-id": "3"
            },
            innerRef: jest.fn(),
            dragHandleProps: null
        }, {
            isDragging: false,
            isDropAnimating: false,
            isClone: false,
            dropAnimation: null,
            draggingOver: null,
            combineWith: null,
            combineTargetFor: null,
            mode: null
        }),
    DragDropContext: ({ children }: { children: null }) => children,
}));

const taskMock: Task = {
    id: 1,
    label: 'Brush my cat',
    status: TASK_STATUS.IN_PROGRESS,
};

describe('TaskCard', () => {
    it('should display a task label, id, assignee icon, and X button icon', () => {
        render(<TaskCard task={taskMock} onDelete={jest.fn()} index={0} onUpdate={jest.fn()} />);

        expect(screen.getByText(taskMock.label)).toBeInTheDocument();
        expect(screen.getByText(`T-${taskMock.id}`)).toBeInTheDocument();
        expect(screen.getByTestId('unassigned-icon')).toBeInTheDocument();
        expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    });

    it('should update the task label when the user edits the label and clicks away', async () => {
        render(<TaskCard task={taskMock} onDelete={jest.fn()} index={0} onUpdate={jest.fn()} />);

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
        render(<TaskCard task={{ ...taskMock, assignee: { id: '6435', name: 'Jon Snow' } }} onDelete={jest.fn()}
            index={0} onUpdate={jest.fn()} />);
        expect(screen.getByText('JS')).toBeInTheDocument();
    });

    it('should call onDelete when the X button is clicked', async () => {
        const handleDeleteMock = jest.fn();
        render(<TaskCard task={taskMock} onDelete={handleDeleteMock} index={0} onUpdate={jest.fn()} />);

        await userEvent.click(screen.getByRole('button', { name: 'delete' }));
        expect(handleDeleteMock).toHaveBeenCalledWith(taskMock);
    });

    it('should call onUpdateAssignee when the user clicks the assigned icon and selects a team member or unassigned', async () => {
        const onUpdateAssigneeMock = jest.fn();
        render(<TaskCard task={taskMock} onDelete={jest.fn()} index={0} onUpdate={jest.fn()} onUpdateAssignee={onUpdateAssigneeMock} />);

        const assigneeButton = screen.getByRole('button', { name: 'select-assignee' });
        await userEvent.click(assigneeButton);

        const menu = screen.getByRole('menu');
        expect(menu).toBeInTheDocument();

        await userEvent.click(screen.getAllByRole('menuitem')[1]);
        expect(onUpdateAssigneeMock).toHaveBeenCalledWith(taskMock, teamMemberMock);
    });
});
