import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import React from "react";


class State implements TRState {
}

export interface Props extends TRProps {
    variant: string;
    format: string;
    margin: string;
    label: string;
    value?: any;
    onChange?: any;
}

export default class TRDateTimePicker extends TRReactComponent<Props, State> {

    state: State = new State();
    static defaultProps = {
        variant: "inline",
        format: "MM/dd/yyyy",
        margin: "normal"
    };

    render() {
        return (<React.Fragment>
        </React.Fragment>);
    }
}