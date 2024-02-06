import { Box, SxProps, Theme } from "@mui/system";
import BoardColumn from "../BoardColumn";
import { TASK_STATUS, Task, TaskId, TaskState } from "@/types";

const classes: Record<string, SxProps<Theme>> = {
    container: {
        width: '99%',
        height: 'auto',
        display: 'flex',
        mt: 1.5,
        mb: 0.25,
        p: 1,
    },
};

interface BoardContentProps {
    taskState: TaskState;
    onDelete?: (task: Task) => void;
    onUpdate?: (task: Task, newText: string) => void;
}

const BoardContent: React.FC<BoardContentProps> = ({ taskState, onDelete, onUpdate }) => {
    const renderColumns = () => {
        return Object.keys(TASK_STATUS).map((key) => {
            const status = TASK_STATUS[key as keyof typeof TASK_STATUS];
            return <BoardColumn header={status} key={key} taskMap={taskState[status]} onDelete={onDelete} onUpdate={onUpdate} />;
        });
    };

    return (
        <Box sx={classes.container} data-testid="board-content">
            {renderColumns()}
        </Box>);
};

export default BoardContent;