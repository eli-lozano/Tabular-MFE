import { TASK_STATUS, Task, TaskId, TaskState } from "@/types";

// Serialize task state for local storage 
const serializeTaskState = (taskState: TaskState): string => {
    return JSON.stringify(
        Object.fromEntries(
            Object.entries(taskState).map(([statusKey, taskMap]) => [
                statusKey,
                Array.from(taskMap.entries())
            ])
        )
    );
};

const deserializeTaskState = (serializedState: string): TaskState => {
    const parsedState = JSON.parse(serializedState);
    const taskState: TaskState = {} as TaskState;

    Object.entries(parsedState).forEach(([statusKey, taskArray]) => {
        taskState[statusKey as TASK_STATUS] = new Map(taskArray as [TaskId, Task][]);
    });

    return taskState;
};

export {
    serializeTaskState,
    deserializeTaskState,
}
