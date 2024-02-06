'use client'
import { Task, TeamMember } from "@/types";
import { Card, CardContent, IconButton, TextField, Typography } from "@mui/material";
import { Box, SxProps, Theme } from "@mui/system";
import { NameInitialsAvatar } from "react-name-initials-avatar";
import CloseIcon from '@mui/icons-material/Close';
import { TASK_ID_PREFIX } from "@/common/constants";
import PersonIcon from '@mui/icons-material/Person';
import { ChangeEvent, useState } from "react";
import { Draggable } from '@hello-pangea/dnd';

const classes: Record<string, SxProps<Theme>> = {
    container: {
        minHeight: 105,
        height: 'auto',
        maxHeight: 350,
        width: 260,
        borderRadius: 4.5,
        backgroundColor: '#F8F0E5',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    },
    content: {
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
    },
    contentFormat: {
        display: 'flex',
        width: '100%',
    },
    element: {
        width: '50%',
        display: 'flex',
    },
    iconButtonFormat: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    iconButton: {
        p: 0.25,
    },
    taskId: {
        color: '#0F2C59',
        opacity: '85%',
    },
};

interface TaskCardProps {
    task: Task;
    index: number;
    onDelete?: (task: Task) => void;
    onUpdate?: (task: Task, newText: string) => void;
}

const renderAssigneeIcon = (assignee?: TeamMember) => {
    return assignee ?
        <NameInitialsAvatar name={assignee.name} bgColor="black" textColor="white" size="24px" textSize="12px" />
        : <PersonIcon data-testid="assignee-icon" />;
};

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onDelete, onUpdate }) => {
    const [text, setText] = useState(task.label);

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    return (
        <Draggable draggableId={task.id.toString()} index={index}>
            {(provided) => (
                <Card sx={classes.container} {...provided.draggableProps}
                    {...provided.dragHandleProps} ref={provided.innerRef}>
                    <CardContent sx={classes.content}>
                        <Box sx={classes.contentFormat}>
                            <Box sx={{ ...classes.element, justifyContent: 'flex-start', width: '85%' }}>
                                <TextField multiline value={text} onChange={handleTextChange}
                                    placeholder="What needs to be done?" onBlur={() => onUpdate && onUpdate(task, text)}
                                    variant="standard" fullWidth
                                    inputProps={{ maxLength: 200 }}
                                    InputProps={{
                                        disableUnderline: true,
                                    }} />
                            </Box>
                            <Box sx={{ ...classes.element, justifyContent: 'flex-end', width: '15%' }}>
                                <Box sx={classes.iconButtonFormat}>
                                    <IconButton aria-label="delete" sx={classes.iconButton}
                                        onClick={() => onDelete && onDelete(task)}>
                                        <CloseIcon data-testid="close-icon" />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={classes.contentFormat}>
                            <Box sx={{ ...classes.element, justifyContent: 'flex-start', mt: 0.5 }}>
                                <Typography fontSize="12px" fontWeight="600" sx={classes.taskId}>
                                    {TASK_ID_PREFIX}{task.id}
                                </Typography>
                            </Box>
                            <Box sx={{ ...classes.element, justifyContent: 'flex-end' }}>
                                {renderAssigneeIcon(task.assignee)}
                            </Box>
                        </Box>
                    </CardContent>
                </Card >
            )}
        </Draggable>);
};

export default TaskCard;
