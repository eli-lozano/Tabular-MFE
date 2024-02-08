import { TASK_STATUS, Task, TaskState } from "@/types";

// Serialize task state for local storage 
const serializeTaskState = (taskState: TaskState): string => {
    return JSON.stringify(
        Object.fromEntries(
            Object.entries(taskState).map(([key, taskMap]) => [
                key,
                Array.from(taskMap.entries())
            ])
        )
    );
};

const deserializeTaskState = (serializedState: string): TaskState => {
    const parsedState = JSON.parse(serializedState);
    const taskState: TaskState = {} as TaskState;

    Object.entries(parsedState).forEach(([key, taskArray]) => {
        taskState[key as TASK_STATUS] = new Map(taskArray as readonly [number, Task][]);
    });

    return taskState;
};


export {
    serializeTaskState,
    deserializeTaskState,
}
