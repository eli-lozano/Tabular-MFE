import { TASK_STATUS, TaskState, TeamMember } from "@/types";
import { deserializeTaskState, serializeTaskState } from "../tasks";

let taskStateMock: TaskState = {
    [TASK_STATUS.TO_DO]: new Map(),
    [TASK_STATUS.IN_PROGRESS]: new Map(),
    [TASK_STATUS.READY_FOR_QA]: new Map(),
    [TASK_STATUS.READY_TO_DEPLOY]: new Map(),
    [TASK_STATUS.DONE]: new Map(),
};

describe('serializeTaskState', () => {
    beforeEach(() => {
        taskStateMock = {
            [TASK_STATUS.TO_DO]: new Map(),
            [TASK_STATUS.IN_PROGRESS]: new Map(),
            [TASK_STATUS.READY_FOR_QA]: new Map(),
            [TASK_STATUS.READY_TO_DEPLOY]: new Map(),
            [TASK_STATUS.DONE]: new Map(),
        };
    });

    it('serializes empty task state', () => {
        const serializedState = serializeTaskState(taskStateMock);
        expect(serializedState).toBe('{"To do":[],"In Progress":[],"Ready for QA":[],"Ready to Deploy":[],"Done":[]}');
    });

    it('serializes task state with one entry', () => {
        taskStateMock[TASK_STATUS.TO_DO] = new Map([[1, { id: 1, label: 'Task 1', status: TASK_STATUS.TO_DO }]]);

        const serializedState = serializeTaskState(taskStateMock);
        const expectedSerializedState =
            '{"To do":[[1,{"id":1,"label":"Task 1","status":"To do"}]],"In Progress":[],"Ready for QA":[],"Ready to Deploy":[],"Done":[]}';

        expect(serializedState).toBe(expectedSerializedState);
    });

    it('serializes task state with multiple entries and team members', () => {
        const teamMember: TeamMember = { id: '1', name: 'John', color: 'blue' };
        taskStateMock[TASK_STATUS.TO_DO] = new Map([[1, { id: 1, label: 'Task 1', status: TASK_STATUS.TO_DO, assignee: teamMember }]]);
        taskStateMock[TASK_STATUS.IN_PROGRESS] = new Map([[2, { id: 2, label: 'Task 2', status: TASK_STATUS.IN_PROGRESS }]]);
        taskStateMock[TASK_STATUS.DONE] = new Map([[3, { id: 3, label: 'Task 3', status: TASK_STATUS.DONE }]]);

        const serializedState = serializeTaskState(taskStateMock);
        const expectedSerializedState =
            '{"To do":[[1,{"id":1,"label":"Task 1","status":"To do","assignee":{"id":"1","name":"John","color":"blue"}}]],"In Progress":[[2,{"id":2,"label":"Task 2","status":"In Progress"}]],"Ready for QA":[],"Ready to Deploy":[],"Done":[[3,{"id":3,"label":"Task 3","status":"Done"}]]}';

        expect(serializedState).toBe(expectedSerializedState);
    });
});

describe('deserializeTaskState', () => {
    beforeEach(() => {
        taskStateMock = {
            [TASK_STATUS.TO_DO]: new Map(),
            [TASK_STATUS.IN_PROGRESS]: new Map(),
            [TASK_STATUS.READY_FOR_QA]: new Map(),
            [TASK_STATUS.READY_TO_DEPLOY]: new Map(),
            [TASK_STATUS.DONE]: new Map(),
        };
    });
    it('deserializes empty task state', () => {
        const serializedState = '{"To do":[],"In Progress":[],"Ready for QA":[],"Ready to Deploy":[],"Done":[]}';
        const deserializedState = deserializeTaskState(serializedState);
        expect(deserializedState).toEqual(taskStateMock);
    });

    it('deserializes task state with one entry', () => {
        const serializedState = '{"To do":[[1,{"id":1,"label":"Task 1","status":"To do"}]],"In Progress":[],"Ready for QA":[],"Ready to Deploy":[],"Done":[]}';
        const deserializedState = deserializeTaskState(serializedState);
        taskStateMock[TASK_STATUS.TO_DO] = new Map([[1, { id: 1, label: 'Task 1', status: TASK_STATUS.TO_DO }]]);
        expect(deserializedState).toEqual(taskStateMock);
    });

    it('deserializes task state with multiple entries and team members', () => {
        const serializedState = '{"To do":[[1,{"id":1,"label":"Task 1","status":"To do","assignee":{"id":"1","name":"John","color":"blue"}}]],"In Progress":[[2,{"id":2,"label":"Task 2","status":"In Progress"}]],"Ready for QA":[],"Ready to Deploy":[],"Done":[[3,{"id":3,"label":"Task 3","status":"Done"}]]}';
        const deserializedState = deserializeTaskState(serializedState);

        const teamMember: TeamMember = { id: '1', name: 'John', color: 'blue' };
        taskStateMock[TASK_STATUS.TO_DO] = new Map([[1, { id: 1, label: 'Task 1', status: TASK_STATUS.TO_DO, assignee: teamMember }]]);
        taskStateMock[TASK_STATUS.IN_PROGRESS] = new Map([[2, { id: 2, label: 'Task 2', status: TASK_STATUS.IN_PROGRESS }]]);
        taskStateMock[TASK_STATUS.DONE] = new Map([[3, { id: 3, label: 'Task 3', status: TASK_STATUS.DONE }]]);

        expect(deserializedState).toEqual(taskStateMock);
    });
});