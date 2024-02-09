import theme from "@/theme";
import { SxProps, Theme } from "@mui/system";

const classes: Record<string, SxProps<Theme>> = {
    card: {
        minHeight: 105,
        height: 'auto',
        maxHeight: 350,
        width: 260,
        borderRadius: 4.5,
        bgcolor: theme.palette.primary.light,
        boxShadow: '0px 5px 5px 0px rgba(0, 0, 0, 0.25)',
    },
    content: {
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
    },
    contentFormat: {
        display: 'flex',
        width: '100%',
    },
    element: {
        width: '50%',
        display: 'flex',
    },
    iconButtonFormat: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    deleteButton: {
        color: theme.palette.secondary.dark,
        opacity: '70%',
        p: 0.25,
    },
    taskId: {
        color: theme.palette.secondary.dark,
        opacity: '85%',
    },
    personIconBackground: {
        width: 28,
        height: 28,
        borderRadius: '50%',
        bgcolor: theme.palette.secondary.dark,
        opacity: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    personIcon: {
        color: 'white',
        fontSize: '23px',
    },
    assigneeButton: {
        display: 'flex',
        justifyContent: 'flex-end',
        p: 0,
    },
    icon: {
        pr: 1.5,
    },
    menu: {
        borderRadius: 7,
        bgcolor: theme.palette.secondary.dark,
    },
    menuItem: {
        color: theme.palette.primary.light,
        fontSize: '13px',
    },
};

export {
    classes
}
