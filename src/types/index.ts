enum TASK_STATUS {
    TO_DO = 'To do',
    IN_PROGRESS = 'In Progress',
    READY_FOR_QA = 'Ready for QA',
    READY_TO_DEPLOY = 'Ready to Deploy',
    DONE = 'Done',
};

type TaskId = number;

type TeamMember = {
    name: string;
}

type Task = {
    id: TaskId;
    label: string;
    status: TASK_STATUS;
    assignee?: TeamMember;
}

// Use a map for instant insertion/deletion
type TaskMap = Map<TaskId, Task>;

type TaskState = {
    [key in TASK_STATUS]: TaskMap;
};

export type { Task, TeamMember, TaskId, TaskState, TaskMap };
export {
    TASK_STATUS
};