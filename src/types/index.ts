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
    assignee?: TeamMember;
}

export type { Task, TeamMember, TaskId };
export {
    TASK_STATUS
};