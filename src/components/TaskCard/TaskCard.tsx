import { Task, TeamMember } from "@/types";
import { Card, CardContent, Typography } from "@mui/material";
import { Box, SxProps, Theme } from "@mui/system";
import { NameInitialsAvatar } from "react-name-initials-avatar";
import CloseIcon from '@mui/icons-material/Close';
import { TASK_ID_PREFIX } from "@/common/constants";

const classes: Record<string, SxProps<Theme>> = {
    container: {
        height: 104,
        width: 260,
        borderRadius: 4.5,
        backgroundColor: '#F8F0E5',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    },
    content: {
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
    },
    contentFormat: {
        display: 'flex',
        //justifyContent: 'space-around'
    },
    element: {
        width: '50%',
        display: 'flex',
    },
};

interface TaskCardProps {
    task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    return (
        <Card sx={classes.container}>
            <CardContent sx={classes.content}>
                <Box sx={classes.contentFormat}>
                    <Box sx={{ ...classes.element, justifyContent: 'flex-start' }}>
                        <Typography fontSize="14px">{task.label}</Typography>
                    </Box>
                    <Box sx={{ ...classes.element, justifyContent: 'flex-end' }}>
                        <CloseIcon />
                    </Box>
                </Box>
                <Box sx={classes.contentFormat}>
                    <Box sx={{ ...classes.element, justifyContent: 'flex-start' }}>
                        <Typography fontSize="12px">{TASK_ID_PREFIX}{task.id}</Typography>
                    </Box>
                    <Box sx={{ ...classes.element, justifyContent: 'flex-end' }}>
                        <NameInitialsAvatar name={task.assignee?.name || 'Un Assigned'} bgColor="black" textColor="white" size="24px" textSize="12px" />
                    </Box>
                </Box>
            </CardContent>
        </Card>);
};

export default TaskCard;
