import { TASK_STATUS, Task, TaskState } from "@/types";

const mockLabel = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`;

const mockLabel2 = `Nunc mi ipsum faucibus vitae. Enim tortor at auctor urna. Ac tortor dignissim convallis aenean et tortor at risus.`;

const mockLabel3 = `Magna eget est lorem ipsum dolor.`;

const mockLabel4 = `At augue eget arcu dictum. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit.`;

// Mock Task Data for Client Use
const task1: Task = {
    id: 1,
    label: mockLabel3,
    status: TASK_STATUS.TO_DO,
};

const task2: Task = {
    id: 2,
    label: mockLabel2,
    status: TASK_STATUS.TO_DO,
};

const task3: Task = {
    id: 3,
    label: mockLabel,
    status: TASK_STATUS.TO_DO,
};

const task4: Task = {
    id: 4,
    label: mockLabel3,
    status: TASK_STATUS.READY_FOR_QA,
};

const task5: Task = {
    id: 5,
    label: mockLabel4,
    status: TASK_STATUS.IN_PROGRESS,
};

const task6: Task = {
    id: 6,
    label: mockLabel3,
    status: TASK_STATUS.IN_PROGRESS,
};

const task7: Task = {
    id: 7,
    label: mockLabel2,
    status: TASK_STATUS.READY_TO_DEPLOY,
};

const task8: Task = {
    id: 8,
    label: mockLabel4,
    status: TASK_STATUS.DONE,
};

export const MockTaskState: TaskState = {
    [TASK_STATUS.TO_DO]: [task1, task2, task3],
    [TASK_STATUS.IN_PROGRESS]: [task5, task6],
    [TASK_STATUS.READY_FOR_QA]: [task4],
    [TASK_STATUS.READY_TO_DEPLOY]: [task7],
    [TASK_STATUS.DONE]: [task8],
};
