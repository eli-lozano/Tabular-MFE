'use client'
import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { NameInitialsAvatar } from 'react-name-initials-avatar';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { useContext } from "react";
import { TeamMembersContext } from "@/state/team-members/context";
import { TeamMembersMap } from "@/types";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { classes } from "./styles/BoardToolbar.styles";
import NotesIcon from '@mui/icons-material/Notes';
import theme from "@/theme";

interface BoardToolbarProps {
    onCreate?: () => void;
    onSave?: () => void;
    onClear?: () => void;
}

const MemberIcons = (teamMembers: TeamMembersMap) => {
    return Array.from(teamMembers).map(([id, teamMember]) =>
        <NameInitialsAvatar name={teamMember.name} textColor="white" bgColor={teamMember.color}
            borderColor={teamMember.color} size="32px" textSize="14px" key={id} />);
};

const BoardToolbar: React.FC<BoardToolbarProps> = ({ onCreate, onSave, onClear }) => {
    const { teamMembersState } = useContext(TeamMembersContext);
    return (
        <Box sx={classes.toolbar} data-testid="board-toolbar">
            <Box sx={{ ...classes.toolbarContent, justifyContent: 'flex-start', paddingLeft: 3 }}>
                <Box sx={classes.iconsContainer}>
                    {MemberIcons(teamMembersState.teamMembers)}
                    <Paper sx={classes.addIconBackground}>
                        <PersonAddAltRoundedIcon fontSize="large" sx={classes.addPersonIcon} />
                    </Paper>
                </Box>
            </Box>
            <Box sx={{ ...classes.toolbarContent, justifyContent: 'flex-end', paddingRight: 6 }}>
                <Box sx={classes.buttonsContainer}>
                    <Button variant="contained" sx={{
                        ...classes.button,
                        bgcolor: theme.palette.secondary.dark,
                        '&:hover': {
                            backgroundColor: theme.palette.secondary.dark,
                            opacity: '0.92',
                            transition: 'background-color 0.2s ease-out, opacity 0.2s ease-out',
                        },
                    }}
                        onClick={onCreate} startIcon={<NotesIcon />}>
                        Create
                    </Button>
                    <Button variant="contained" sx={classes.button}
                        onClick={onSave} startIcon={<SaveIcon />} color="success">
                        Save
                    </Button>
                    <Button variant="contained" sx={classes.button}
                        onClick={onClear} color="error" startIcon={<DeleteIcon />}>
                        Clear
                    </Button>
                </Box>
            </Box>
        </Box>);
};

export default BoardToolbar;
