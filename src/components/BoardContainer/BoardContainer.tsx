import { Typography } from "@mui/material";
import { Box, SxProps, Theme } from "@mui/system";

const classes: Record<string, SxProps<Theme>> = {
    container: {
        height: 925,
        width: 1680,
        m: 3,
    },
    titleContainer: {
        height: 89,
        width: '100%'
    },
    title: {
        fontFamily: 'Krona One',
        fontSize: 48,
    },
    toolbar: {
        height: 58,
        width: '100%'
    },
    content: {
        height: 770,
        width: '100%',
    },
};

const BoardContainer: React.FC = () => {
    return (
        <Box sx={classes.container}>
            <Box sx={classes.titleContainer}><Typography sx={classes.title}>Tabular.io</Typography></Box>
            <Box sx={classes.toolbar}>Board Toolbar</Box>
            <Box sx={classes.content}>Board Content</Box>
        </Box>
    );
};

export default BoardContainer;
