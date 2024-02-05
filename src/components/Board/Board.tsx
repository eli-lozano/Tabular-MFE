'use client';
import { Typography } from "@mui/material";
import { Box, SxProps, Theme } from "@mui/system";
import BoardToolbar from "../BoardToolbar";
import BoardContent from "../BoardContent";
import { useState } from "react";
import { Task, TaskId, TaskState } from "@/types";
import { MockTaskState } from "@/test-utils/mocks/task-mocks";

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

    return (
        <Box sx={classes.container}>
            <Box sx={classes.content}>
                <Box sx={classes.titleContainer}><Typography sx={classes.title}>Tabular.io</Typography></Box>
                <BoardToolbar memberNames={['Eli Lozano', 'Cristina Carillo']} />
                <BoardContent taskState={taskState} onDelete={handleDeleteTask} />
            </Box>
        </Box>
    );
};

export default Board;
