import theme from "@/theme";
import { SxProps, Theme } from "@mui/system";

const classes: Record<string, SxProps<Theme>> = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    content: {
        minHeight: '94vh',
        height: 'auto',
        width: '96vw',
        m: 2,
        bgcolor: theme.palette.primary.light,
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
        fontSize: 49,
        color: theme.palette.secondary.dark,
    },
};

export {
    classes
}