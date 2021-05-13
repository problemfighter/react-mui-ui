import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import React from "react";
import {CheckCircleOutlineIcon, HighlightOffIcon} from "./ui-component";


class State implements TRState {
}

export interface Props extends TRProps {
    isActive: boolean;
}

export default class TrStatusSign extends TRReactComponent<Props, State> {

    state: State = new State();
    static defaultProps = {
        isActive: true,
    };

    render() {
        return (this.props.isActive ? <CheckCircleOutlineIcon color="primary"/> : <HighlightOffIcon color="secondary"/>);
    }
}