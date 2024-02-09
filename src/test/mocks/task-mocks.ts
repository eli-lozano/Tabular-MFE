import { TASK_STATUS, Task, TaskState } from "@/types";
import { teamMemberMock, teamMemberMock2, teamMemberMock3, teamMemberMock4, teamMemberMock5 } from "./team-member-mocks";

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
    assignee: teamMemberMock3,
};

const task4: Task = {
    id: 4,
    label: mockLabel3,
    status: TASK_STATUS.READY_FOR_QA,
    assignee: teamMemberMock2,
};

const task5: Task = {
    id: 5,
    label: mockLabel4,
    status: TASK_STATUS.IN_PROGRESS,
    assignee: teamMemberMock5,
};

const task6: Task = {
    id: 6,
    label: mockLabel3,
    status: TASK_STATUS.IN_PROGRESS,
    assignee: teamMemberMock2,
};

const task7: Task = {
    id: 7,
    label: mockLabel2,
    status: TASK_STATUS.READY_TO_DEPLOY,
    assignee: teamMemberMock,
};

const task8: Task = {
    id: 8,
    label: mockLabel4,
    status: TASK_STATUS.DONE,
    assignee: teamMemberMock,
};

const MockTaskState: TaskState = {
    [TASK_STATUS.TO_DO]: new Map([[task1.id, task1], [task2.id, task2], [task3.id, task3]]),
    [TASK_STATUS.IN_PROGRESS]: new Map([[task5.id, task5], [task6.id, task6]]),
    [TASK_STATUS.READY_FOR_QA]: new Map([[task4.id, task4]]),
    [TASK_STATUS.READY_TO_DEPLOY]: new Map([[task7.id, task7]]),
    [TASK_STATUS.DONE]: new Map([[task8.id, task8]]),
};

const MockSerializedTaskState = '{\"To do\":[[1,{\"id\":1,\"label\":\"Magna eget est lorem ipsum dolor.\",\"status\":\"To do\"}],[2,{\"id\":2,\"label\":\"Nunc mi ipsum faucibus vitae. Enim tortor at auctor urna. Ac tortor dignissim convallis aenean et tortor at risus.\",\"status\":\"To do\"}],[3,{\"id\":3,\"label\":\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua\",\"status\":\"To do\",\"assignee\":{\"id\":\"6453\",\"name\":\"Patrick Martinez\",\"color\":\"red\"}}]],\"In Progress\":[[5,{\"id\":5,\"label\":\"At augue eget arcu dictum. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit.\",\"status\":\"In Progress\",\"assignee\":{\"id\":\"6343\",\"name\":\"Ethan Cheatham\",\"color\":\"purple\"}}],[6,{\"id\":6,\"label\":\"Magna eget est lorem ipsum dolor.\",\"status\":\"In Progress\",\"assignee\":{\"id\":\"3453\",\"name\":\"Daniel Portillo\",\"color\":\"green\"}}]],\"Ready for QA\":[[4,{\"id\":4,\"label\":\"Magna eget est lorem ipsum dolor.\",\"status\":\"Ready for QA\",\"assignee\":{\"id\":\"3453\",\"name\":\"Daniel Portillo\",\"color\":\"green\"}}]],\"Ready to Deploy\":[[7,{\"id\":7,\"label\":\"Nunc mi ipsum faucibus vitae. Enim tortor at auctor urna. Ac tortor dignissim convallis aenean et tortor at risus.\",\"status\":\"Ready to Deploy\",\"assignee\":{\"id\":\"7453\",\"name\":\"Eli Lozano\",\"color\":\"orange\"}}]],\"Done\":[[8,{\"id\":8,\"label\":\"At augue eget arcu dictum. Habitasse platea dictumst vestibulum rhoncus est pellentesque elit.\",\"status\":\"Done\",\"assignee\":{\"id\":\"7453\",\"name\":\"Eli Lozano\",\"color\":\"orange\"}}]]}'

export {
    MockTaskState,
    MockSerializedTaskState
}
