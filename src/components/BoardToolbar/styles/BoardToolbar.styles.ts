import { SxProps, Theme } from "@mui/system";

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
        backgroundColor: '#0F2C59',
        opacity: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        height: 39,
        width: 99,
        mt: 1.5,
        textTransform: 'none',
    },
    createButton: {
        backgroundColor: '#0F2C59',
        color: '#F8F0E5',
        '&:hover': {
            backgroundColor: '#0F2C59',
        },
    },
    addPersonIcon: {
        color: 'white',
        fontSize: '24px',
        ml: 0.45
    },
    buttonsContainer: {
        minWidth: '40%',
        display: 'flex',
        justifyContent: 'space-evenly',
        gap: 1
    },
};

export {
    classes
}
