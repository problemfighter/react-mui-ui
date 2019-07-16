import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import classNames from 'classnames';
import {
    amber,
    CheckCircleIcon, ClearIcon, CloseIcon, createStyles, ErrorIcon, green,
    IconButton, InfoIcon, Snackbar,
    SnackbarContent, Theme, WarningIcon, withStyles
} from "./ui-component";
import React from "react";


const trFlashContentStyle = (theme:Theme) => createStyles({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});



export enum Variant {
    success = "success",
    warning = "warning",
    error = "error",
    info = "info"
}

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

interface TRFlashContentProps extends TRProps {
    classes: any,
    message: any,
    onCloseFunction: any,
    variant:Variant
}

interface TRFlashContentState extends TRState {
}

class TRFlashContent extends TRReactComponent<TRFlashContentProps, TRFlashContentState> {

    render(){
        const { classes, message, onCloseFunction, variant, ...other } = this.props;
        const Icon = variantIcon[variant];
        return (
            <React.Fragment>
                <SnackbarContent
                    className={classNames(classes[variant])}
                    aria-describedby="client-snackbar"
                    message={<span id="client-snackbar" className={classes.message}><Icon className={classNames(classes.icon, classes.iconVariant)} />{message}</span>}
                    action={[<IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={onCloseFunction}>
                            <CloseIcon className={classes.icon} />
                        </IconButton>]}
                    {...other}
                />
            </React.Fragment>
        );
    }
}

const ShowSnackBarContent = withStyles(trFlashContentStyle)(TRFlashContent);



interface TRFlashProps extends TRProps {
    variant: Variant
    message: string,
    onCloseFunction: any,
    isOpen: boolean,
}

interface TRFlashState extends TRState {}
const SNACK_BAR_AUTO_HIDE_DURATION = 5000;
export default class TRFlashMessage extends TRReactComponent<TRFlashProps, TRFlashState> {
    render() {
        const {message, onCloseFunction, variant, isOpen } = this.props;
        return (
            <React.Fragment>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={isOpen}
                    autoHideDuration={SNACK_BAR_AUTO_HIDE_DURATION}
                    onClose={onCloseFunction}>
                    <ShowSnackBarContent
                        onCloseFunction={onCloseFunction}
                        variant={variant}
                        message={message}
                    />
                </Snackbar>
            </React.Fragment>
        );
    }
}