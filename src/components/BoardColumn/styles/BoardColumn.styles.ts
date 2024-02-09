import theme from "@/theme";
import { SxProps, Theme } from "@mui/system";

const classes: Record<string, SxProps<Theme>> = {
    container: {
        minHeight: 140,
        width: '20%',
        minWidth: 265,
        bgcolor: 'rgba(218, 192, 163, 42%)',
        borderRadius: 1.75,
        m: '0px 4px'
    },
    content: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        mt: 2,
        mb: 3.5,
    },
    headerContainer: {
        height: 53,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    header: {
        fontSize: 14,
        fontWeight: 600,
        pl: 2,
        opacity: '85%',
        color: theme.palette.secondary.dark,
    },
    cards: {
        height: '100%',
        width: 260,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
    },
};

export {
    classes
}
