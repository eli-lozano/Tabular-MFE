'use client'
import { Task, TeamMember, TeamMembersMap } from "@/types";
import { Card, CardContent, IconButton, Menu, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { Box, SxProps, Theme } from "@mui/system";
import { NameInitialsAvatar } from "react-name-initials-avatar";
import CloseIcon from '@mui/icons-material/Close';
import { TASK_ID_PREFIX } from "@/common/constants";
import PersonIcon from '@mui/icons-material/Person';
import { ChangeEvent, useContext, useState } from "react";
import { Draggable } from '@hello-pangea/dnd';
import { TeamMembersContext } from "@/state/team-members/context";

const classes: Record<string, SxProps<Theme>> = {
    container: {
        minHeight: 105,
        height: 'auto',
        maxHeight: 350,
        width: 260,
        borderRadius: 4.5,
        backgroundColor: '#F8F0E5',
        boxShadow: '0px 5px 5px 0px rgba(0, 0, 0, 0.25)',
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
    deleteButton: {
        color: '#0F2C59',
        opacity: '70%',
        p: 0.25,
    },
    taskId: {
        color: '#0F2C59',
        opacity: '85%',
    },
    personIconBackground: {
        width: 28,
        height: 28,
        borderRadius: '50%',
        backgroundColor: '#0F2C59',
        opacity: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    personIcon: {
        color: 'white',
        fontSize: '23px',
    },
    assigneeButton: {
        display: 'flex',
        justifyContent: 'flex-end',
        p: 0,
    },
    icon: {
        pr: 1.5,
    },
    menu: {
        borderRadius: 7,
        bgcolor: '#0F2C59',
    },
    menuItem: {
        color: '#F8F0E5',
    },
};

interface TaskCardProps {
    task: Task;
    index: number;
    onDelete?: (task: Task) => void;
    onUpdate?: (task: Task, newText: string) => void;
    onUpdateAssignee?: (task: Task, assignee?: TeamMember) => void;
}

const UnassignedIcon = (
    <Paper sx={classes.personIconBackground}>
        <PersonIcon data-testid="unassigned-icon" sx={classes.personIcon} />
    </Paper>
);

const renderAssigneeIcon = (assignee?: TeamMember) => {
    return assignee ?
        <NameInitialsAvatar name={assignee.name} bgColor={assignee.color} borderColor={assignee.color}
            textColor="white" size="24px" textSize="12px" />
        : (UnassignedIcon);
};

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onDelete, onUpdate, onUpdateAssignee }) => {
    const { teamMembersState } = useContext(TeamMembersContext);
    const [text, setText] = useState(task.label);
    const [anchor, setAnchor] = useState<null | HTMLElement>(null);

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleClose = () => {
        setAnchor(null);
    };

    const renderAssigneeMenu = (teamMembers: TeamMembersMap, anchor: null | HTMLElement) => {
        return (
            <Menu anchorEl={anchor} open={Boolean(anchor)} onClick={handleClose}
                onClose={handleClose} slotProps={{ paper: { sx: classes.menu } }}>
                <MenuItem onClick={() => onUpdateAssignee && onUpdateAssignee(task, undefined)}
                    sx={classes.menuItem}>
                    <Box sx={classes.icon}>
                        {UnassignedIcon}
                    </Box>
                    Unassign
                </MenuItem>
                {
                    Array.from(teamMembers).map(([id, teamMember]) =>
                        <MenuItem key={id} onClick={() =>
                            onUpdateAssignee && onUpdateAssignee(task, teamMember)}
                            sx={classes.menuItem}>
                            <Box sx={classes.icon}>
                                {renderAssigneeIcon(teamMember)}
                            </Box>
                            {teamMember.name}
                        </MenuItem>
                    )
                }
            </Menu >);
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
                                    placeholder="What needs to be done?"
                                    onBlur={() => onUpdate && onUpdate(task, text)}
                                    variant="standard" fullWidth sx={classes.text}
                                    inputProps={{ maxLength: 200 }}
                                    InputProps={{
                                        disableUnderline: true,
                                    }} />
                            </Box>
                            <Box sx={{ ...classes.element, justifyContent: 'flex-end', width: '15%' }}>
                                <Box sx={classes.iconButtonFormat}>
                                    <IconButton aria-label="delete" sx={classes.deleteButton}
                                        onClick={() => onDelete && onDelete(task)}>
                                        <CloseIcon data-testid="close-icon" />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={classes.contentFormat}>
                            <Box sx={{ ...classes.element, justifyContent: 'flex-start', mt: 0.5 }}>
                                <Typography fontSize="12px" fontWeight="900" sx={classes.taskId}>
                                    {TASK_ID_PREFIX}{task.id}
                                </Typography>
                            </Box>
                            <Box sx={{ ...classes.element, justifyContent: 'flex-end' }}>
                                <IconButton aria-label="select-assignee" sx={classes.assigneeButton}
                                    onClick={(e: React.MouseEvent<HTMLElement>) => setAnchor(e.currentTarget)}>
                                    {renderAssigneeIcon(task.assignee)}
                                </IconButton>
                            </Box>
                            {renderAssigneeMenu(teamMembersState.teamMembers, anchor)}
                        </Box>
                    </CardContent>
                </Card >
            )}
        </Draggable>);
};

export default TaskCard;
