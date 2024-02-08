'use client';
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import BoardToolbar from "../BoardToolbar";
import BoardContent from "../BoardContent";
import { useEffect, useState } from "react";
import { TASK_STATUS, Task, TaskId, TaskState, TaskStatusReverseMap, TeamMember } from "@/types";
import { MockTaskState } from "@/test/mocks/task-mocks";
import { DragDropContext } from '@hello-pangea/dnd';
import { DropResult } from "@hello-pangea/dnd";
import { TeamMembersContext } from "@/state/team-members/context";
import { initialTeamMembersState } from "@/state/team-members/state";
import { classes } from "./styles/Board.styles";
import { serializeTaskState, deserializeTaskState } from "@/utils/tasks";
import { MAX_TASK_ID_MOCK } from "@/common/constants";

const Board: React.FC = () => {
    const [taskState, setTaskState] = useState<TaskState>({} as TaskState);
    const [maxTaskId, setMaxTaskId] = useState<TaskId>(0);

    // Hydrate task state based on local storage if it exists or mock data
    useEffect(() => {
        let storedTaskState: string | null = '';
        let storedMaxTaskId: string | null = '';
        if (window && window.localStorage) {
            storedTaskState = localStorage.getItem('taskState');
            storedMaxTaskId = localStorage.getItem('maxTaskId');
        }

        setTaskState(storedTaskState ? deserializeTaskState(storedTaskState) : MockTaskState);
        setMaxTaskId(storedMaxTaskId ? Number(JSON.parse(storedMaxTaskId)) : MAX_TASK_ID_MOCK);
    }, []);

    const handleSave = () => {
        localStorage.setItem('taskState', serializeTaskState(taskState));
        localStorage.setItem('maxTaskId', maxTaskId.toString());
    };

    const handleClear = () => {
        setTaskState((prevTaskState) => {
            Object.values(TASK_STATUS).forEach((value) => prevTaskState[value].clear());
            return { ...prevTaskState };
        });
        setMaxTaskId(0);
    };

    const handleCreateTask = () => {
        const newTaskId = maxTaskId + 1;
        setTaskState((prevTaskState) => {
            prevTaskState[TASK_STATUS.TO_DO].set(newTaskId, {
                id: newTaskId,
                label: '',
                status: TASK_STATUS.TO_DO
            });
            return { ...prevTaskState };
        });
        setMaxTaskId(newTaskId);
    };

    const handleDeleteTask = (task: Task) => {
        // If the max ID is being deleted, we must decrement the max ID
        if (task.id === maxTaskId) {
            setMaxTaskId((prevMaxId) => prevMaxId - 1);
        }

        setTaskState((prevTaskState) => {
            prevTaskState[task.status].delete(task.id);
            return { ...prevTaskState };
        });
    };

    const handleUpdateTask = (task: Task, newText: string) => {
        setTaskState((prevTaskState) => {
            prevTaskState[task.status].set(task.id, {
                ...task,
                label: newText
            });
            return { ...prevTaskState };
        });
    };

    const handleUpdateAssignee = (task: Task, assignee?: TeamMember) => {
        setTaskState((prevTaskState) => {
            prevTaskState[task.status].set(task.id, {
                ...task,
                assignee
            });
            return { ...prevTaskState };
        });
    };

    // Synchronously update state to reflect drag/drop result
    const handleDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination || (source.droppableId === destination.droppableId && destination.index === source.index)) {
            return;
        }

        const draggedTaskId = Number(draggableId);
        const sourceColumnKey = TaskStatusReverseMap[source.droppableId];
        const sourceTaskMap = taskState[sourceColumnKey];
        const newSourceTaskList = Array.from(sourceTaskMap);

        // Same column, but different indexes
        if (source.droppableId === destination.droppableId) {

            // Remove the source task
            newSourceTaskList.splice(source.index, 1);
            // Add the dragged task to the destination index; dragged task is guaranteed to be in map
            newSourceTaskList.splice(destination.index, 0, [draggedTaskId, sourceTaskMap.get(draggedTaskId)!]);

            setTaskState((prevTaskState) => ({
                ...prevTaskState,
                [sourceColumnKey]: new Map(newSourceTaskList)
            }));
        // Different columns, different indices 
        } else {
            const destColumnKey = TaskStatusReverseMap[destination.droppableId];
            const newDestTaskList = Array.from(taskState[destColumnKey]);

            newSourceTaskList.splice(source.index, 1);
            // Update the task status to reflect the new column
            newDestTaskList.splice(destination.index, 0, [draggedTaskId,
                { ...sourceTaskMap.get(draggedTaskId)!, status: destColumnKey }]);

            setTaskState((prevTaskState) => ({
                ...prevTaskState,
                [sourceColumnKey]: new Map(newSourceTaskList),
                [destColumnKey]: new Map(newDestTaskList),
            }));
        }
    };

    return (
        <Box sx={classes.container}>
            <Box sx={classes.content}>
                <TeamMembersContext.Provider value={{ teamMembersState: initialTeamMembersState }}>
                    <Box sx={classes.titleContainer}>
                        <Typography sx={classes.title}>Tabular.io</Typography>
                    </Box>
                    <BoardToolbar onCreate={handleCreateTask} onSave={handleSave} onClear={handleClear} />
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <BoardContent taskState={taskState} onDelete={handleDeleteTask}
                            onUpdate={handleUpdateTask} onUpdateAssignee={handleUpdateAssignee} />
                    </DragDropContext>
                </TeamMembersContext.Provider>
            </Box>
        </Box>
    );
};

export default Board;
