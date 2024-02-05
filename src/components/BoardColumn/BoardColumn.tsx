import { TASK_STATUS, Task, TaskId, TaskMap } from "@/types";
import { Typography } from "@mui/material";
import { Box, SxProps, Theme } from "@mui/system";
import TaskCard from "../TaskCard/TaskCard";
import { useEffect } from "react";

const classes: Record<string, SxProps<Theme>> = {
    container: {
        minHeight: 140,
        width: '20%',
        minWidth: 265,
        backgroundColor: 'rgba(234, 219, 200, 75%)',
        borderRadius: 1.75,
        m: '0px 3px'
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        mt: 2,
        mb: 3.5,
    },
    headerContainer: {
        height: 53,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    header: {
        fontSize: 14,
        fontWeight: 600,
        pl: 2,
        opacity: '85%',
        color: '#0F2C59',
    },
    cards: {
        height: '100%',
        width: 260,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
    },
};

interface BoardColumnProps {
    header: TASK_STATUS;
    onDelete: (task: Task) => void;
    taskMap?: TaskMap;
}

const BoardColumn: React.FC<BoardColumnProps> = ({ header, onDelete, taskMap = new Map() }) => {
    const renderTaskCards = () => {
        return Array.from(taskMap).map(([id, task]) => <TaskCard task={task} key={id} onDelete={onDelete} />);
    };

    return (
        <Box sx={classes.container}>
            <Box sx={classes.headerContainer}>
                <Typography sx={classes.header}>{header.toUpperCase()}</Typography>
            </Box>
            {taskMap && taskMap.size > 0 &&
                <Box sx={classes.content}>
                    <Box sx={classes.cards}>
                        {renderTaskCards()}
                    </Box>
                </Box>
            }
        </Box>
    );
};

export default BoardColumn;
