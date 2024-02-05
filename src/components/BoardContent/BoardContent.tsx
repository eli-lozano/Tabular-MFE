import { Box, SxProps, Theme } from "@mui/system";
import BoardStatusColumn from "../BoardStatusColumn";
import { TASK_STATUS } from "@/types";

const classes: Record<string, SxProps<Theme>> = {
    container: {
        width: '99%',
        display: 'flex',
        mt: 1.5,
        p: 1,
    },
};

const renderColumns = () => {
    return Object.keys(TASK_STATUS).map((key) => {
        if (TASK_STATUS[key as keyof typeof TASK_STATUS] === TASK_STATUS.TO_DO) {
            return <BoardStatusColumn header={TASK_STATUS[key as keyof typeof TASK_STATUS]} key={key} tasks={[{ id: 1, label: 'Task A' }]} />;
        }
        return <BoardStatusColumn header={TASK_STATUS[key as keyof typeof TASK_STATUS]} key={key} />;
    });
};

const BoardContent: React.FC = () => {
    return (
        <Box sx={classes.container} data-testid="board-content">
            {renderColumns()}
        </Box>);
};

export default BoardContent;