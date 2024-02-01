'use client'
import { Button, Typography } from "@mui/material";
import { Box, SxProps, Theme, styled } from "@mui/system";
import { NameInitialsAvatar } from 'react-name-initials-avatar';

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
        marginTop: 1,
        gap: 0.8,
    },
    teamMembersContainer: {
        display: 'flex',
        gap: 2.75,
    },
    teamMembersLabel: {
        fontFamily: 'IBM Plex Mono',
        fontSize: 24,
        fontWeight: 600,
        marginTop: 1.5,
    },
    createButton: {
        height: 39,
        width: 99,
        marginTop: 1.5,
        backgroundColor: '#0F2C59',
        color: '#F8F0E5',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#0F2C59',
        },
    },
};

interface BoardToolbarProps {
    memberNames: string[];
}

const MemberIcons = (memberNames: string[]) => {
    return memberNames.map((name) => <NameInitialsAvatar name={name} textColor="white" bgColor="black" />);
};

const BoardToolbar: React.FC<BoardToolbarProps> = ({ memberNames }) => {
    return (
        <Box sx={classes.toolbar} data-testid="board-toolbar">
            <Box sx={{ ...classes.toolbarContent, justifyContent: 'flex-start', paddingLeft: 3 }}>
                <Box sx={classes.teamMembersContainer}>
                    <Typography sx={classes.teamMembersLabel}>Team Members: </Typography>
                    <Box sx={classes.iconsContainer}>{MemberIcons(memberNames)}</Box>
                </Box>
            </Box>
            <Box sx={{ ...classes.toolbarContent, justifyContent: 'flex-end', paddingRight: 6 }}>
                <Button variant="contained" sx={classes.createButton}>Create</Button>
            </Box>
        </Box>);
};

export default BoardToolbar;
