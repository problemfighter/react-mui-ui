import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import React from "react";
import {OnActionFunction} from "./tr-ui-data";
import TRDialog from "./tr-dialog";
import {Button, DialogContentText} from "./ui-component";


class TRAlertDialogState implements TRState {
    public isOpen: boolean = false;
}

export interface TRAlertDialogProps extends TRProps {
    isOpen: boolean;
    title?: string;
    message: string;
    okayLabel?: string;
    cancelLabel?: string;
    okayFunction?:OnActionFunction;
    cancelFunction?:OnActionFunction;
    onCloseCallbackData?: any;
}

export default class TRAlertDialog extends TRReactComponent<TRAlertDialogProps, TRAlertDialogState> {

    state: TRAlertDialogState = new TRAlertDialogState();

    static defaultProps = {
        title: "Confirm",
        okayLabel: "Confirm",
        cancelLabel: "Cancel",
    };

    constructor(props: TRAlertDialogProps){
        super(props);
        this.state.isOpen = props.isOpen;
    }



    componentDidUpdate(prevProps: TRAlertDialogProps) {
        if (this.props.isOpen !== prevProps.isOpen) {
            this.setState({isOpen: this.props.isOpen})
        }
    }

    private closePopup(){
        this.setState({isOpen: false})
    }

    private okayFunction(event: any) {
        if (this.props.okayFunction && this.props.okayFunction.click){
            this.props.okayFunction.click(event, this.props.onCloseCallbackData)
            this.closePopup();
        }
    }

    private cancelFunction(event: any) {
        if (this.props.cancelFunction && this.props.cancelFunction.click){
            this.props.cancelFunction.click(event, this.props.onCloseCallbackData)
        }
        this.closePopup();
    }

    render(){
        const {title, message, okayLabel, cancelLabel} = this.props;

        return (<React.Fragment>
            <TRDialog
                isOpen={this.state.isOpen}
                children={<DialogContentText>{message}</DialogContentText>}
                title={title}
                action={
                    <React.Fragment>
                        <Button onClick={(event:any) => {this.okayFunction(event)}} color="primary">{okayLabel}</Button>
                        <Button onClick={(event:any) => {this.cancelFunction(event)}} color="primary" autoFocus>{cancelLabel}</Button>
                    </React.Fragment>
                }
            />
        </React.Fragment>);
    }
}



