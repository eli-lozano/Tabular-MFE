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
import CreateIcon from '@mui/icons-material/Create';

interface BoardToolbarProps {
    onCreate?: () => void;
    onSave?: () => void;
}

const MemberIcons = (teamMembers: TeamMembersMap) => {
    return Array.from(teamMembers).map(([id, teamMember], index) =>
        <NameInitialsAvatar name={teamMember.name} textColor="white" bgColor={teamMember.color}
            borderColor={teamMember.color} size="32px" textSize="14px" key={id} />);
};

const BoardToolbar: React.FC<BoardToolbarProps> = ({ onCreate, onSave }) => {
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
                        ...classes.button, backgroundColor: '#0F2C59', color: '#F8F0E5',
                        '&:hover': {
                            backgroundColor: '#0F2C59',
                            opacity: '0.92',
                            transition: 'background-color 0.2s ease-out, opacity 0.2s ease-out',
                        },
                    }}
                        onClick={onCreate} startIcon={<CreateIcon />} color="primary">
                        Create
                    </Button>
                    <Button variant="contained" sx={{ ...classes.button, }}
                        onClick={onSave} startIcon={<SaveIcon />} color="success">
                        Save
                    </Button>
                    <Button variant="contained" sx={classes.button}
                        onClick={onCreate} color="error" startIcon={<DeleteIcon />}>
                        Clear
                    </Button>
                </Box>
            </Box>
        </Box>);
};

export default BoardToolbar;
