enum TASK_STATUS {
    TO_DO = 'To do',
    IN_PROGRESS = 'In Progress',
    READY_FOR_QA = 'Ready for QA',
    READY_TO_DEPLOY = 'Ready to Deploy',
    DONE = 'Done',
};

const TaskStatusReverseMap: Record<string, TASK_STATUS> = {
    'To do': TASK_STATUS.TO_DO,
    'In Progress': TASK_STATUS.IN_PROGRESS,
    'Ready for QA': TASK_STATUS.READY_FOR_QA,
    'Ready to Deploy': TASK_STATUS.READY_TO_DEPLOY,
    'Done': TASK_STATUS.DONE,
};

type TaskId = number;
type TeamMemberId = string;

type TeamMember = {
    id: TeamMemberId;
    name: string;
    color: string;
}

type TeamMembersMap = Map<TeamMemberId, TeamMember>;

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

export type { Task, TeamMember, TeamMembersMap, TaskId, TeamMemberId, TaskState, TaskMap };
export {
    TASK_STATUS,
    TaskStatusReverseMap
};