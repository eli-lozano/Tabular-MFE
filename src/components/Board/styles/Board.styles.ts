import { SxProps, Theme } from "@mui/system";

const classes: Record<string, SxProps<Theme>> = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    content: {
        minHeight: '95vh',
        height: 'auto',
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

export {
    classes
}