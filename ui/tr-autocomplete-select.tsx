import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import React from "react";
import {TextField} from "./ui-component";
import {Autocomplete} from "@material-ui/lab";

class State implements TRState {

}

export interface Props extends TRProps {
    isMulti: boolean;
    label: string;
    placeholder: string;

    variant: any;

    defaultValue?: any;

    name?: string;
    value?: string;
    onChange?: any;
    helperText?: any;
    error?: boolean;
    fullWidth: boolean;
    autoComplete: boolean;
    options: Array<any>;
    optionLabel: string;
    optionValue: string;
}

export default class TRAutocompleteSelect extends TRReactComponent<Props, State> {

    state: State = new State();

    static defaultProps = {
        autoComplete: false,
        isMulti: false,
        fullWidth: true,
        variant: "standard",
    };

    render(){
        const {isMulti, placeholder, variant, label, fullWidth, options, defaultValue} = this.props;


        return (
            <React.Fragment>
                <Autocomplete
                    multiple={isMulti}
                    options={options}
                    getOptionLabel={(option: any) => option.title}
                    defaultValue={defaultValue}
                    renderInput={ params => (
                        <TextField
                            {...params}
                            variant={variant}
                            label={label}
                            placeholder={placeholder}
                            fullWidth={fullWidth}
                        />
                    )}
                />
            </React.Fragment>
        );
    }

}