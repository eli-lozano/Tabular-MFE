'use client'
import { Button, Paper } from "@mui/material";
import { Box, SxProps, Theme } from "@mui/system";
import { NameInitialsAvatar } from 'react-name-initials-avatar';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { useContext } from "react";
import { TeamMembersContext } from "@/state/team-members/context";
import { TeamMembersMap } from "@/types";

const classes: Record<string, SxProps<Theme>> = {
    toolbar: {
        height: 58,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    toolbarContent: {
        height: '100%',
        width: '50%',
        display: 'flex',
    },
    iconsContainer: {
        display: 'flex',
        flexDirection: 'row',
        mt: 1.5,
        ml: 1,
        gap: 0.8,
    },
    addIconBackground: {
        mt: 0.07,
        ml: 0.75,
        width: 36,
        height: 36,
        borderRadius: '50%',
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    createButton: {
        height: 39,
        width: 99,
        mt: 1.5,
        backgroundColor: '#0F2C59',
        color: '#F8F0E5',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#0F2C59',
        },
    },
    addPersonIcon: {
        color: 'white',
        fontSize: '24px',
        ml: 0.45
    },
};

interface BoardToolbarProps {
    onCreate?: () => void;
}

const MemberIcons = (teamMembers: TeamMembersMap) => {
    return Array.from(teamMembers).map(([id, teamMember], index) =>
        <NameInitialsAvatar name={teamMember.name} textColor="white" bgColor="black" size="32px" textSize="14px" key={id} />);
};

const BoardToolbar: React.FC<BoardToolbarProps> = ({ onCreate }) => {
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
                <Button variant="contained" sx={classes.createButton} onClick={onCreate}>Create</Button>
            </Box>
        </Box>);
};

export default BoardToolbar;
