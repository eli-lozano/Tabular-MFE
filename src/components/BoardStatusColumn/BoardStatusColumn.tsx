import { TASK_STATUS, Task } from "@/types";
import { Typography } from "@mui/material";
import { Box, SxProps, Theme } from "@mui/system";
import TaskCard from "../TaskCard/TaskCard";

const classes: Record<string, SxProps<Theme>> = {
    container: {
        height: '100%',
        minHeight: 140,
        width: '20%',
        minWidth: 265,
        backgroundColor: 'rgba(234, 219, 200, 80%)',
        borderRadius: 1.75,
        m: '0px 3px'
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        mt: 2,
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

interface BoardStatusColumnProps {
    header: TASK_STATUS;
    tasks?: Task[];
}

const BoardStatusColumn: React.FC<BoardStatusColumnProps> = ({ header, tasks = [] }) => {

    const renderTaskCards = () => {
        return tasks.map((task) => <TaskCard task={task} key={task.id} />)
    };

    return (
        <Box sx={classes.container}>
            <Box sx={classes.headerContainer}>
                <Typography sx={classes.header}>{header.toUpperCase()}</Typography>
            </Box>
            {tasks && tasks.length > 0 &&
                <Box sx={classes.content}>
                    <Box sx={classes.cards}>
                        {renderTaskCards()}
                    </Box>
                </Box>
            }
        </Box>
    );
};

export default BoardStatusColumn;
