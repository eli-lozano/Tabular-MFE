import { Typography } from "@mui/material";
import { Box, SxProps, Theme } from "@mui/system";
import BoardToolbar from "../BoardToolbar";
import BoardContent from "../BoardContent";

const classes: Record<string, SxProps<Theme>> = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        overflowX: 'hidden',
    },
    content: {
        height: '95vh',
        width: '96vw',
        m: 2,
        backgroundColor: '#F8F0E5',
        borderRadius: 2.5,
    },
    titleContainer: {
        height: 89,
        width: '100%',
        pt: 3,
        pl: 4.5,
    },
    title: {
        fontFamily: 'Krona One',
        fontSize: 48,
        color: '#0F2C59',
    },
};

const BoardContainer: React.FC = () => {
    return (
        <Box sx={classes.container}>
            <Box sx={classes.content}>
                <Box sx={classes.titleContainer}><Typography sx={classes.title}>Tabular.io</Typography></Box>
                <BoardToolbar memberNames={['Eli Lozano', 'Cristina Carillo']} />
                <BoardContent />
            </Box>
        </Box>
    );
};

export default BoardContainer;
