import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import React from "react";
import {TextField} from "./ui-component";
import {Autocomplete} from "@material-ui/lab";

class State implements TRState {
    value: { [key: string]: any } = {};
    options: Array<any> = [];
}

export interface Props extends TRProps {
    isMulti: boolean;
    label: string;
    placeholder?: string;

    variant: any;

    defaultValue?: any ;
    margin?: any;

    name?: string;
    value?: string;
    onChange?: any;
    helperText?: any;
    error: boolean;
    fullWidth: boolean;
    autoComplete: boolean;
    options: Array<any>;
    optionLabel: string;
    optionValue: string;
    disabled: boolean;
}

export default class TRAutocompleteSelect extends TRReactComponent<Props, State> {

    state: State = new State();

    static defaultProps = {
        autoComplete: false,
        error: false,
        disabled: false,
        isMulti: false,
        fullWidth: true,
        variant: "standard",
    };

    private setOptions(){
        this.setState({options: this.props.options})
    }

    private setValue(value: any){
        let _this = this;
        if (value){
            this.props.options.map(item => {
                if (value && item[this.props.optionValue] === value){
                    _this.setState({value: item});
                }
            });
        }
    }

    isEmptyObject (data: any) {
        return Object.keys(data).length === 0;
    }

    componentDidMount() {
        this.setOptions();
        this.setValue(this.props.value);
        if (this.isEmptyObject(this.state.value) && this.props.defaultValue){
            this.setState({value: this.props.defaultValue})
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.options !== this.props.options || prevProps.value !== this.props.value){
            this.setOptions();
            this.setValue(this.props.value);
        }
    }

    render() {
        let _this = this;
        const {
            isMulti, placeholder, variant, label, fullWidth, options, defaultValue, optionLabel,
            autoComplete, value, error, helperText, onChange, name, margin, optionValue
        } = this.props;



        return (
            <React.Fragment>
                // @ts-ignore
                <Autocomplete
                    autoComplete={autoComplete}
                    multiple={isMulti}
                    options={_this.state.options}
                    getOptionLabel={(option: any) => option[optionLabel] ? option[optionLabel] : ""  }
                    value={_this.state.value}
                    onChange={(event: any, currentValue: any) => {
                        this.setState({value: currentValue});
                        if (onChange) {
                            let cValue = undefined;
                            if (_this.props.optionValue) {
                                cValue = currentValue[_this.props.optionValue]
                            }
                            let changeData = {
                                raw: currentValue,
                                target: {
                                    name: _this.props.name,
                                    value: cValue
                                }
                            };
                            onChange(changeData);
                        }
                    }}
                    renderInput={ params => (
                        <TextField
                            {...params}
                            margin={margin}
                            error={error}
                            name={name}
                            helperText={helperText}
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