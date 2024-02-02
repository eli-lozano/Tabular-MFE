import { Box, SxProps, Theme } from "@mui/system";
import BoardStatusColumn from "../BoardStatusColumn";
import { TASK_STATUS } from "@/types";

const classes: Record<string, SxProps<Theme>> = {
    container: {
        width: '99%',
        display: 'flex',
        marginTop: 1.5,
        p: 1,
    },
};

const renderColumns = () => {
    return Object.keys(TASK_STATUS).map((key) => <BoardStatusColumn header={TASK_STATUS[key as keyof typeof TASK_STATUS]} key={key} />);
};

const BoardContent: React.FC = () => {
    return (
        <Box sx={classes.container} data-testid="board-content">
            {renderColumns()}
        </Box>);
};

export default BoardContent;