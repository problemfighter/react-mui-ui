import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import React from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions, Drawer} from "./ui-component";
import {OnActionFunction} from "./tr-ui-data";

export enum SlideSide {
    LEFT = "left",
    RIGHT = "right",
    TOP = "top",
    BOTTOM = "bottom"
}


class TRDrawerState implements TRState {
    public isOpen: boolean = false;
}

interface TRDrawerProps extends TRProps {
    isOpen: boolean;
    slideSide:SlideSide;
    onCloseFunction?: OnActionFunction;
    onCloseCallbackData?: any;
    autoClose?: boolean;
    bodyContent?: any;
}

export default class TRDrawer extends TRReactComponent<TRDrawerProps, TRDrawerState> {

    static defaultProps = {
        slideSide: SlideSide.LEFT,
        autoClose: false
    };

    state: TRDrawerState = new TRDrawerState();

    constructor(props: TRDrawerProps){
        super(props);
        this.state.isOpen = props.isOpen;
    }


    componentDidUpdate(prevProps: TRDrawerProps) {
        if (this.props.isOpen !== prevProps.isOpen) {
            this.setState({isOpen: this.props.isOpen})
        }
    }

    private onClose(event: any) {
        if (this.props.onCloseFunction && this.props.onCloseFunction.click) {
            this.props.onCloseFunction.click(event, this.props.onCloseCallbackData)
        } else if (this.props.autoClose) {
            this.setState({isOpen: false})
        }
    }

    render() {
        const {slideSide, bodyContent} = this.props;
        return (
            <React.Fragment>
                <Drawer open={this.state.isOpen} anchor={slideSide} onClose={(event: any) => {
                    this.onClose(event);}}>
                    {bodyContent}
                </Drawer>
            </React.Fragment>
        );
    }
}