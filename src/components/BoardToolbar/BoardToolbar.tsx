'use client'
import { Button } from "@mui/material";
import { Box, SxProps, Theme, styled } from "@mui/system";
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
    addIcon: {
        mt: 0.15,
        ml: 0.75
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
                    <Box sx={classes.addIcon}>
                        <PersonAddAltRoundedIcon fontSize="large" />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ ...classes.toolbarContent, justifyContent: 'flex-end', paddingRight: 6 }}>
                <Button variant="contained" sx={classes.createButton} onClick={onCreate}>Create</Button>
            </Box>
        </Box>);
};

export default BoardToolbar;
