import { TASK_STATUS, Task, TaskId, TaskMap, TeamMember } from "@/types";
import { Typography } from "@mui/material";
import { Box, SxProps, Theme } from "@mui/system";
import TaskCard from "../TaskCard/TaskCard";
import { Droppable } from '@hello-pangea/dnd';

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
        height: '100%',
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
    taskMap?: TaskMap;
    onDelete?: (task: Task) => void;
    onUpdate?: (task: Task, newText: string) => void;
    onUpdateAssignee?: (task: Task, assignee?: TeamMember) => void;
}

const BoardColumn: React.FC<BoardColumnProps> = ({ header, onDelete, onUpdate, onUpdateAssignee, taskMap = new Map() }) => {
    const renderTaskCards = () => {
        return Array.from(taskMap).map(([id, task], index) =>
            <TaskCard task={task} key={id} onDelete={onDelete} index={index} onUpdate={onUpdate}
                onUpdateAssignee={onUpdateAssignee} />);
    };

    return (
        <Box sx={classes.container}>
            <Box sx={classes.headerContainer}>
                <Typography sx={classes.header}>{header.toUpperCase()}</Typography>
            </Box>
            <Droppable droppableId={header}>
                {(provided) =>
                    <Box sx={classes.content} {...provided.droppableProps} ref={provided.innerRef}>
                        <Box sx={classes.cards}>
                            {taskMap && taskMap.size > 0 &&
                                renderTaskCards()
                            }
                            {provided.placeholder}
                        </Box>
                    </Box>
                }
            </Droppable>
        </Box>
    );
};

export default BoardColumn;
