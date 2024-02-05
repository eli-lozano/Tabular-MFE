import { Box, SxProps, Theme } from "@mui/system";
import BoardStatusColumn from "../BoardColumn";
import { TASK_STATUS, Task, TaskState } from "@/types";

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
}

const renderColumns = (taskState: TaskState) => {
    return Object.keys(TASK_STATUS).map((key) => {
        const status = TASK_STATUS[key as keyof typeof TASK_STATUS];
        return <BoardStatusColumn header={status} key={key} tasks={taskState[status]} />;
    });
};

const BoardContent: React.FC<BoardContentProps> = ({ taskState }) => {
    return (
        <Box sx={classes.container} data-testid="board-content">
            {renderColumns(taskState)}
        </Box>);
};

export default BoardContent;