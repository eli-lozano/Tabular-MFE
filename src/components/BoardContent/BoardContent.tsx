import { Box, SxProps, Theme } from "@mui/system";
import BoardColumn from "../BoardColumn";
import { TASK_STATUS, Task, TaskState, TeamMember } from "@/types";
import { classes } from "./styles/BoardContent.styles";

interface BoardContentProps {
    taskState: TaskState;
    onDelete?: (task: Task) => void;
    onUpdate?: (task: Task, newText: string) => void;
    onUpdateAssignee?: (task: Task, assignee?: TeamMember) => void;
}

const BoardContent: React.FC<BoardContentProps> = ({ taskState, onDelete, onUpdate, onUpdateAssignee }) => {
    const renderColumns = () => {
        return Object.keys(TASK_STATUS).map((key) => {
            const status = TASK_STATUS[key as keyof typeof TASK_STATUS];
            return <BoardColumn header={status} key={key} taskMap={taskState[status]}
                onDelete={onDelete} onUpdate={onUpdate} onUpdateAssignee={onUpdateAssignee} />;
        });
    };

    return (
        <Box sx={classes.container} data-testid="board-content">
            {renderColumns()}
        </Box>);
};

export default BoardContent;