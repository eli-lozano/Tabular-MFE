import { Box, SxProps, Theme } from "@mui/system";

const classes: Record<string, SxProps<Theme> | undefined> = {
    container: {
        height: 925,
        width: 1680,
        m: 3,
    },
    title: {
        height: 89,
        width: '100%'
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
            <Box sx={classes.title}>Board Title</Box>
            <Box sx={classes.toolbar}>Board Toolbar</Box>
            <Box sx={classes.content}>Board Content</Box>
        </Box>
    );
};

export default BoardContainer;
