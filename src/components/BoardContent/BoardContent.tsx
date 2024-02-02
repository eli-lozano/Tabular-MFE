import { Box, SxProps, Theme } from "@mui/system";
import BoardStatusColumn from "../BoardStatusColumn";
import { TASK_STATUS } from "@/types";

const classes: Record<string, SxProps<Theme>> = {
    container: {
        display: 'flex',
        marginTop: 1.5,
        p: 1,
    },
};

const BoardContent: React.FC = () => {
    return (
        <Box sx={classes.container}>
            <BoardStatusColumn header={TASK_STATUS.TO_DO} tasks={[{ id: 1, label: 'Task A' }]} />
            <BoardStatusColumn header={TASK_STATUS.IN_PROGRESS} />
            <BoardStatusColumn header={TASK_STATUS.READY_FOR_QA} />
            <BoardStatusColumn header={TASK_STATUS.READY_TO_DEPLOY} />
            <BoardStatusColumn header={TASK_STATUS.DONE} />
        </Box>);
};

export default BoardContent;