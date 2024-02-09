import { TASK_STATUS, Task, TaskState } from "@/types";
import { teamMemberMock, teamMemberMock2, teamMemberMock3, teamMemberMock4, teamMemberMock5 } from "./team-member-mocks";

const mockLabel = `Implement feedback collector`;

const mockLabel2 = `Allow users to change between two tiers at the same price`;

const mockLabel3 = `Apply a prorated discount to a user when they move from a low to a high priced tier`;

const mockLabel4 = `Create subscription plans and discount codes in Stripe`;

const mockLabel5 = `Force SSL on any page that contains account info`;

const mockLabel6 = `Add analytics to pricing page`;

const mockLabel7 = `Install SSL certificate`;

const mockLabel8 = `Automate collection of feedback for weekly email report`;

// Mock Task Data for Client Demo/Testing Use
const task1: Task = {
    id: 1,
    label: mockLabel,
    status: TASK_STATUS.TO_DO,
};

const task2: Task = {
    id: 2,
    label: mockLabel2,
    status: TASK_STATUS.IN_PROGRESS,
    assignee: teamMemberMock4
};

const task3: Task = {
    id: 3,
    label: mockLabel3,
    status: TASK_STATUS.IN_PROGRESS,
    assignee: teamMemberMock3,
};

const task4: Task = {
    id: 4,
    label: mockLabel4,
    status: TASK_STATUS.READY_FOR_QA,
    assignee: teamMemberMock2,
};

const task5: Task = {
    id: 5,
    label: mockLabel5,
    status: TASK_STATUS.READY_FOR_QA,
    assignee: teamMemberMock5,
};

const task6: Task = {
    id: 6,
    label: mockLabel6,
    status: TASK_STATUS.READY_FOR_QA,
    assignee: teamMemberMock2,
};

const task7: Task = {
    id: 7,
    label: mockLabel7,
    status: TASK_STATUS.DONE,
    assignee: teamMemberMock,
};

const task8: Task = {
    id: 8,
    label: mockLabel8,
    status: TASK_STATUS.READY_TO_DEPLOY,
    assignee: teamMemberMock,
};

const MockTaskState: TaskState = {
    [TASK_STATUS.TO_DO]: new Map([[task1.id, task1]]),
    [TASK_STATUS.IN_PROGRESS]: new Map([[task2.id, task2], [task3.id, task3]]),
    [TASK_STATUS.READY_FOR_QA]: new Map([[task4.id, task4], [task5.id, task5], [task6.id, task6]]),
    [TASK_STATUS.READY_TO_DEPLOY]: new Map([[task8.id, task8]]),
    [TASK_STATUS.DONE]: new Map([[task7.id, task7]]),
};

const MockSerializedTaskState = '{\"To do\":[[1,{\"id\":1,\"label\":\"Implement feedback collector\",\"status\":\"To do\"}]],\"In Progress\":[[2,{\"id\":2,\"label\":\"Allow users to change between two tiers at the same price\",\"status\":\"In Progress\",\"assignee\":{\"id\":\"2345\",\"name\":\"Joseph Noel\",\"color\":\"blue\"}}],[3,{\"id\":3,\"label\":\"Apply a prorated discount to a user when they move from a low to a high priced tier\",\"status\":\"In Progress\",\"assignee\":{\"id\":\"6453\",\"name\":\"Patrick Martinez\",\"color\":\"red\"}}]],\"Ready for QA\":[[4,{\"id\":4,\"label\":\"Create subscription plans and discount codes in Stripe\",\"status\":\"Ready for QA\",\"assignee\":{\"id\":\"3453\",\"name\":\"Daniel Portillo\",\"color\":\"green\"}}],[5,{\"id\":5,\"label\":\"Force SSL on any page that contains account info\",\"status\":\"Ready for QA\",\"assignee\":{\"id\":\"6343\",\"name\":\"Ethan Cheatham\",\"color\":\"purple\"}}],[6,{\"id\":6,\"label\":\"Add analytics to pricing page\",\"status\":\"Ready for QA\",\"assignee\":{\"id\":\"3453\",\"name\":\"Daniel Portillo\",\"color\":\"green\"}}]],\"Ready to Deploy\":[[8,{\"id\":8,\"label\":\"Automate collection of feedback for weekly email report\",\"status\":\"Ready to Deploy\",\"assignee\":{\"id\":\"7453\",\"name\":\"Eli Lozano\",\"color\":\"orange\"}}]],\"Done\":[[7,{\"id\":7,\"label\":\"Install SSL certificate\",\"status\":\"Done\",\"assignee\":{\"id\":\"7453\",\"name\":\"Eli Lozano\",\"color\":\"orange\"}}]]}'

export {
    MockTaskState,
    MockSerializedTaskState
}
