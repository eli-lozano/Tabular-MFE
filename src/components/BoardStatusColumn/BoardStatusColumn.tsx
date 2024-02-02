import { TASK_STATUS, Task } from "@/types";
import { Typography } from "@mui/material";
import { Box, SxProps, Theme } from "@mui/system";
import TaskCard from "../TaskCard/TaskCard";

const classes: Record<string, SxProps<Theme>> = {
    container: {
        minHeight: '100%',
        minWidth: 331,
        backgroundColor: '#EADBC8',
        borderRadius: 1.75,
        margin: '0px 3px'
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 2,
    },
    headerContainer: {
        height: 53,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    header: {
        fontFamily: 'Roboto Mono',
        fontSize: 24,
        fontWeight: 900,
        paddingLeft: 4.5,
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
        return tasks.map((task) => <TaskCard task={task} />)
    };

    return (
        <Box sx={classes.container}>
            <Box sx={classes.headerContainer}>
                <Typography sx={classes.header}>{header}</Typography>
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
