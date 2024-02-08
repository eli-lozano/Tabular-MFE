import { TASK_STATUS, Task, TaskId, TaskMap, TeamMember } from "@/types";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import TaskCard from "../TaskCard/TaskCard";
import { Droppable } from '@hello-pangea/dnd';
import { classes } from "./styles/BoardColumn.styles";

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
