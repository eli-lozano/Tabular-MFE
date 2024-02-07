'use client';
import { Typography } from "@mui/material";
import { Box, SxProps, Theme } from "@mui/system";
import BoardToolbar from "../BoardToolbar";
import BoardContent from "../BoardContent";
import { useState } from "react";
import { TASK_STATUS, Task, TaskId, TaskState, TaskStatusReverseMap, TeamMember } from "@/types";
import { MockTaskState } from "@/test/mocks/task-mocks";
import { DragDropContext } from '@hello-pangea/dnd';
import { DropResult } from "@hello-pangea/dnd";
import { TeamMembersContext } from "@/state/team-members/context";
import { initialTeamMembersState } from "@/state/team-members/state";

const classes: Record<string, SxProps<Theme>> = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        overflowX: 'hidden',
    },
    content: {
        minHeight: '95vh',
        height: 'auto',
        width: '96vw',
        m: 2,
        backgroundColor: '#F8F0E5',
        borderRadius: 2.5,
    },
    titleContainer: {
        height: 89,
        width: '100%',
        pt: 3,
        pl: 4.5,
    },
    title: {
        fontFamily: 'Krona One',
        fontSize: 48,
        color: '#0F2C59',
    },
};

const Board: React.FC = () => {
    const [taskState, setTaskState] = useState<TaskState>(MockTaskState);

    const handleCreateTask = () => {
        // Increment the total of all tasks to get a new ID
        const newTaskId = Object.values(taskState).reduce((acc, taskMap) => acc + taskMap.size, 0) + 1;
        setTaskState((prevTaskState) => {
            prevTaskState[TASK_STATUS.TO_DO].set(newTaskId, {
                id: newTaskId,
                label: '',
                status: TASK_STATUS.TO_DO
            });
            return { ...prevTaskState };
        });
    };

    const handleDeleteTask = (task: Task) => {
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

    // Synchronously update state to reflect DnD result
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
                    <BoardToolbar onCreate={handleCreateTask} />
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
