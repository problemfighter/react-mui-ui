import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {FormControlLabel, Switch} from "./ui-component";
import React from "react";
import {SwitchProps} from "@material-ui/core";

class TrSearchState implements TRState {

}

export interface TRSearchProps extends TRProps, SwitchProps {
    label: any
    value?: string
}

export default class TrSwitchInput extends TRReactComponent<TRSearchProps, TrSearchState> {

    render() {
        const {label} = this.props;
        return <FormControlLabel control={<Switch {...this.props}/>} label={label}/>
    }
}