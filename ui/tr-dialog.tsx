import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import React from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions} from "./ui-component";
import {OnActionFunction} from "./tr-ui-data";

export enum DialogMaxWidth {
    EXTRA_SMALL = "xs",
    SMALL = "sm",
    MIDIUM = "md",
    LARGE = "lg",
    EXTRA_LARGE = "xl"
}


class TRDialogState implements TRState {
    public isOpen: boolean = false;
}

class TRDialogProps implements TRProps {
    public isOpen: boolean = false;
    public fullWidth?: boolean;
    public fullScreen?: boolean;
    public children: any;
    public title?: string;
    public maxWidth?: DialogMaxWidth;
    public action?: any;
    public onCloseFunction?: OnActionFunction;
    public onCloseCallbackData?: any;
    public autoClose?: boolean;
}

export default class TRDialog extends TRReactComponent<TRDialogProps, TRDialogState> {

    static defaultProps = {
        maxWidth: DialogMaxWidth.SMALL,
        fullWidth: false,
        fullScreen: false,
        autoClose: false,
    };

    state: TRDialogState = new TRDialogState();

    constructor(props: TRDialogProps){
        super(props);
        this.state.isOpen = props.isOpen;
    }

    private getTitle(title: string | undefined) {
        if (title) {
            return (<DialogTitle>{title}</DialogTitle>)
        }
    }

    private getAction(action: string | undefined) {
        if (action) {
            return (<DialogActions>{action}</DialogActions>)
        }
    }

    private onClose(event:any){
        if (this.props.onCloseFunction && this.props.onCloseFunction.click){
            this.props.onCloseFunction.click(event, this.props.onCloseCallbackData)
            this.setState({isOpen: false})
        } else if (this.props.autoClose){
            this.setState({isOpen: false})
        }
    }

    componentDidUpdate(prevProps: TRDialogProps) {
        if (this.props.isOpen !== prevProps.isOpen) {
            this.setState({isOpen: this.props.isOpen})
        }
    }

    render() {
        const {maxWidth, title, children, action, fullScreen, fullWidth} = this.props;
        return (<React.Fragment>
            <Dialog open={this.state.isOpen} maxWidth={maxWidth} fullScreen={fullScreen} fullWidth={fullWidth}
                    onClose={(event: any) => {
                        this.onClose(event);
                    }}>
                {this.getTitle(title)}
                <DialogContent>
                    {children}
                </DialogContent>
                {this.getAction(action)}
            </Dialog>
        </React.Fragment>);
    }
}