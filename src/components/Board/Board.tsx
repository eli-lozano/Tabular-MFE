'use client';
import { Typography } from "@mui/material";
import { Box, SxProps, Theme } from "@mui/system";
import BoardToolbar from "../BoardToolbar";
import BoardContent from "../BoardContent";
import { useState } from "react";
import { TASK_STATUS, Task, TaskId, TaskState, TaskStatusReverseMap } from "@/types";
import { MockTaskState } from "@/test/mocks/task-mocks";
import { DragDropContext } from '@hello-pangea/dnd';
import { DropResult } from "react-beautiful-dnd";
import { TASK_ID_PREFIX } from "@/common/constants";
import { Preview } from "@mui/icons-material";

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

    const handleDeleteTask = (task: Task) => {
        setTaskState((prevTaskState) => {
            prevTaskState[task.status]?.delete(task.id);
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
            newDestTaskList.splice(destination.index, 0, [draggedTaskId, sourceTaskMap.get(draggedTaskId)!]);

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
                <Box sx={classes.titleContainer}><Typography sx={classes.title}>Tabular.io</Typography></Box>
                <BoardToolbar memberNames={['Eli Lozano', 'Cristina Carillo']} />
                <DragDropContext onDragEnd={handleDragEnd}>
                    <BoardContent taskState={taskState} onDelete={handleDeleteTask} />
                </DragDropContext>
            </Box>
        </Box>
    );
};

export default Board;