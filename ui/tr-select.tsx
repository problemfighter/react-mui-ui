import React, {HTMLAttributes} from 'react';
import TRReactComponent from 'tm-react/src/artifacts/framework/tr-react-component';
import {TRProps, TRState} from 'tm-react/src/artifacts/model/tr-model';
import Select, {ControlProps, OptionProps, PlaceholderProps, ValueContainerProps} from "react-select";
import {MenuItem, TextField, Typography, withStyles} from "./ui-component";
import {BaseTextFieldProps} from "@material-ui/core";
import {createStyles, Theme} from "@material-ui/core/styles";
import { NoSsr } from '@material-ui/core';


type MuiPlaceholderProps = Omit<PlaceholderProps<OptionType, boolean>, 'innerProps'> & Partial<Pick<PlaceholderProps<OptionType, boolean>, 'innerProps'>>;
type InputComponentProps = Pick<BaseTextFieldProps, 'inputRef'> & HTMLAttributes<HTMLDivElement>;
function inputComponent({inputRef, ...props}: InputComponentProps) {
    return <div ref={inputRef} {...props} />;
}


export const ReactSelectStyles = (theme: Theme) =>
    createStyles({
            root: {
                flexGrow: 1,
                minWidth: 200,
                overflow: 'visible'
            },
            input: {
                display: 'flex',
                padding: 0,
                height: 'auto',
            },
            placeholder: {
                position: 'absolute',
                left: 2,
                bottom: 6,
                fontSize: 16,
            },
            valueContainer: {
                display: 'flex',
                flexWrap: 'wrap',
                flex: 1,
                alignItems: 'center',
                overflow: 'visible',
            },
        }
    );

interface OptionType {
    label: string;
    value: string;
    data?: any;
}

interface Props extends TRProps {
    isMulti: boolean;
    placeholder?: string;

    helperText?: any;
    error?: boolean;
    label: string;
    classes: any;
    onChange?: any;
    name?: string;

    options: Array<any>;
    optionLabel: string;
    optionValue: string;
    value?: any;

    customOption?: { (props: any): any };
}

class State implements TRState {
    value: any = null;
    options: any = [];
}

class TrSelect extends TRReactComponent<Props, State> {

    state: State = new State();

    static defaultProps = {
        isMulti: false,
    };


    componentDidMount() {
       this.loadOption();
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.options !== this.props.options || prevProps.value !== this.props.value) {
            this.loadOption();
        }
    }

    loadOption() {
        let optionData = this.lisToOptionType(this.props);
        if (optionData) {
            this.setState({
                value: optionData.selected,
                options: optionData.options,
            })
        }
    }

    selectOption(props: OptionProps<OptionType, boolean>) {
        const {
            selectProps: {selectMainProps},
        } = props;
        return (
            <MenuItem
                ref={props.innerRef}
                selected={props.isFocused}
                component="div"
                style={{
                    fontWeight: props.isSelected ? 500 : 400,
                }}
                {...props.innerProps}>
                {selectMainProps.customOption ? selectMainProps.customOption(props) : props.children}
            </MenuItem>
        );
    }

    selectControl(props: ControlProps<OptionType, boolean>) {
        const {
            children,
            innerProps,
            innerRef,
            selectProps: {classes, TextFieldProps},
        } = props;
        return (
            <TextField
                fullWidth
                InputProps={{
                    inputComponent,
                    inputProps: {
                        className: classes.input,
                        ref: innerRef,
                        children,
                        ...innerProps,
                    },
                }}
                {...TextFieldProps}
            />
        );
    }

    onChange(data: any) {
        let _this = this;
        this.setState(status => {
            return {
                value: data
            }
        }, () => {
            if (this.props.onChange) {
                let value;
                if (data instanceof Array) {
                    value = [];
                    data.map(item => {
                        value.push(item.value)
                    });

                } else {
                    value = data.value
                }
                let changeData = {
                    raw: data,
                    target: {
                        name: _this.props.name,
                        value: value
                    }
                };
                this.props.onChange(changeData);
            }
        });
    }

    lisToOptionType(props: Props) {
        let optionData: { [key: string]: any } = {};
        optionData.options = [];
        optionData.selected = null;
        if (props.options && props.optionValue && props.optionLabel) {
            let items: Array<OptionType> = [];

            if (props.value instanceof Array) {
                optionData.selected = []
            }
            props.options.map(item => {
                items.push({value: item[props.optionValue], label: item[props.optionLabel]})
                if (props.value && props.value === item[props.optionValue]) {
                    optionData.selected = {value: item[props.optionValue], label: item[props.optionLabel]}
                } else if (props.value instanceof Array) {
                    for (let nestedValue in props.value) {
                        if (props.value[nestedValue] == item[props.optionValue]) {
                            optionData.selected.push({value: item[props.optionValue], label: item[props.optionLabel]})
                        }
                    }
                }
            });
            optionData.options = items;
        }
        return optionData
    }

    selectPlaceholder(props: MuiPlaceholderProps) {
        const {selectProps, innerProps = {}, children} = props;
        return (
            <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
                {children}
            </Typography>
        );
    }

    selectValueContainer(props: ValueContainerProps<OptionType, boolean>) {
        return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
    }

    render() {
        const _this = this;
        const {label, helperText, error, classes, placeholder, isMulti} = this.props;
        let placeholderLabel = label;
        if (placeholder) {
            placeholderLabel = placeholder;
        }
        return (
            <div className={classes.root}>
                <NoSsr>
                    <Select
                        onChange={(data: any) => {
                            _this.onChange(data)
                        }}
                        selectMainProps={_this.props}
                        classes={classes}
                        components={
                            {
                                Control: _this.selectControl,
                                Option: _this.selectOption,
                                Placeholder: _this.selectPlaceholder,
                                ValueContainer: _this.selectValueContainer
                            }
                        }
                        name={_this.props.name}
                        value={_this.state.value}
                        options={_this.state.options}
                        TextFieldProps={{
                            label: label,
                            autoComplete: 'off',
                            helperText: helperText,
                            error: error,
                            InputLabelProps: {
                                shrink: true,
                            },
                        }}

                        placeholder={placeholderLabel}
                        isMulti={isMulti}
                    />
                </NoSsr>
            </div>
        );
    }

}

export default withStyles(ReactSelectStyles)(TrSelect);