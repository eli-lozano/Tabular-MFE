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

type TaskState = {
    [key in TASK_STATUS]: Task[];
};

export type { Task, TeamMember, TaskId, TaskState };
export {
    TASK_STATUS
};