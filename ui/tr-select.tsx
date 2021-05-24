import React, {HTMLAttributes} from 'react';
import TRReactComponent from 'tm-react/src/artifacts/framework/tr-react-component';
import {TRProps, TRState} from 'tm-react/src/artifacts/model/tr-model';
import Select, {ControlProps, OptionProps, PlaceholderProps, ValueContainerProps} from "react-select";
import AsyncSelect from 'react-select/async';
import {MenuItem, TextField, Typography, withStyles} from "./ui-component";
import {BaseTextFieldProps} from "@material-ui/core";
import {createStyles, Theme} from "@material-ui/core/styles";
import {NoSsr} from '@material-ui/core';


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

class OptionData {
    options: any = [];
    selected: any = null;
    missingSelected: any = [];
    private isValueTypeArray = false

    setSelectedType(props: any) {
        if (props.value instanceof Array) {
            this.selected = []
            this.isValueTypeArray = true
        } else {
            this.selected = null
        }
        return this
    }

    addValueList(value: any) {
        if (this.isValueTypeArray && value) {
            this.missingSelected = value
        } else if (value) {
            this.missingSelected = [value]
        }
        return this
    }

    removeValueFromList(value: any) {
        let index = this.missingSelected.indexOf(value)
        if (index !== -1) {
            this.missingSelected.splice(index, 1)
        }
        return this
    }

    addToSelected(data: any) {
        if (this.isValueTypeArray && data) {
            this.selected.push(data)
        } else if (data) {
            this.selected = data
        }
    }

    private processSelected(item: any) {
        let _this = this
        for (let selectedValue in this.missingSelected) {
            if (this.missingSelected[selectedValue] === item.value) {
                _this.addToSelected(item)
                _this.removeValueFromList(item.value)
            }
        }
    }

    setOptionDataAndMapToSelected(options: any) {
        if (options && options instanceof Array) {
            this.options = options
            for (let item of this.options) {
                this.processSelected(item)
                if (this.missingSelected.length === 0) {
                    break;
                }
            }
        }
        return this
    }
}

interface Props extends TRProps {
    isAsync?: boolean;
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
    loadOptionsFromAPI?: { (inputValue: any, selectedIds: any, callback: any): any };
}

class State implements TRState {
    value: any = null;
    options: any = [];
    asyncOptions: any = []
    loadDefaultOptions: boolean = true
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
        if (this.props.isAsync) {
            if (!this.state.value) {
                this.setState({loadDefaultOptions: false}, () => {
                    this.setState({loadDefaultOptions: true})
                })
            }
        } else {
            let optionData = this.lisToOptionType(this.props);
            if (optionData) {
                this.setState({
                    value: optionData.selected,
                    options: optionData.options,
                })
            }
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
                let chosenValue: any = [];
                if (data instanceof Array) {
                    data.map(item => {
                        chosenValue.push(item.value)
                    });
                } else {
                    chosenValue = data.value
                }
                let changeData = {
                    raw: data,
                    target: {
                        name: _this.props.name,
                        value: chosenValue
                    }
                };
                this.props.onChange(changeData);
            }
        });
    }

    lisToOptionType(props: any) {
        let optionData: OptionData = new OptionData();
        if (props.options && props.optionValue && props.optionLabel) {
            optionData.setSelectedType(props)
            optionData.addValueList(props.value)
            let items: Array<OptionType> = [];
            let itemValue: any;
            props.options.map((item: any) => {
                items.push({value: item[props.optionValue], label: item[props.optionLabel], data: item})
                itemValue = item[props.optionValue]
                if (props.value && props.value === item[props.optionValue]) {
                    optionData.selected = {value: itemValue, label: item[props.optionLabel]}
                    optionData.removeValueFromList(itemValue)
                } else if (props.value instanceof Array) {
                    for (let nestedValue in props.value) {
                        if (props.value[nestedValue] == itemValue) {
                            optionData.selected.push({value: itemValue, label: item[props.optionLabel]})
                            optionData.removeValueFromList(itemValue)
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

    mergeArrays(source: any, destination: any) {
        if (source) {
            source.forEach((item: any) => {
                let isExist = false
                destination.forEach((dstItem: any) => {
                    if (dstItem.value === item.value) {
                        isExist = true
                    }
                })
                if (!isExist) {
                    destination.push(item)
                }
            })
        }
        return destination
    }

    private processAsyncCallback(optionData: OptionData, callback: any) {
        if (optionData && optionData.options && callback) {
            if (!this.state.value && optionData.selected){
                this.setState({value: optionData.selected})
            }
            callback(optionData.options)
        }
    }

    loadAsyncOptionsFromAPI(inputValue: any, callback: any, ids: any = []) {
        let _this = this;
        if (this.props.loadOptionsFromAPI) {
            this.props.loadOptionsFromAPI(inputValue, ids, function (data: any) {
                let props = {
                    optionLabel: _this.props.optionLabel,
                    optionValue: _this.props.optionValue,
                    options: [],
                    value: _this.props.value
                }
                if (data && data.length) {
                    props.options = data
                    let optionData = _this.lisToOptionType(props);
                    _this.state.asyncOptions = _this.mergeArrays(optionData.options, _this.state.asyncOptions)
                    _this.loadOptionsFromAPI(inputValue, callback)
                } else {
                    _this.processAsyncCallback(new OptionData(), callback)
                }
            })
        }
    }

    private filterAsyncInputValue(inputValue: any, callback: any) {
        let response = this.state.asyncOptions.filter((item: any) =>
            item.label.toLowerCase().includes(inputValue.toLowerCase())
        );
        if (response.length) {
            if (callback) {
                callback(response)
            }
        } else {
            this.loadAsyncOptionsFromAPI(inputValue, callback)
        }
    }

    loadOptionsFromAPI(inputValue: any, callback: any) {
        let _this = this;
        let optionData: OptionData = new OptionData().setSelectedType(_this.props);
        if (inputValue) {
            _this.filterAsyncInputValue(inputValue, callback)
            return
        } else if (!inputValue && _this.state.asyncOptions.length !== 0) {
            optionData.addValueList(_this.props.value).setOptionDataAndMapToSelected(_this.state.asyncOptions)
        }

        if (optionData.options.length !== 0 && optionData.missingSelected.length === 0) {
            _this.processAsyncCallback(optionData, callback)
        } else {
            _this.loadAsyncOptionsFromAPI(inputValue, callback, optionData.missingSelected)
        }
    }

    render() {
        const _this = this;
        const {label, helperText, error, classes, placeholder, isMulti, isAsync} = this.props;
        let placeholderLabel = label;
        if (placeholder) {
            placeholderLabel = placeholder;
        }
        let SelectType: any = Select
        let attributes: any = {}
        if (isAsync) {
            SelectType = AsyncSelect
        } else {
            attributes.options = _this.state.options
        }
        attributes.value = _this.state.value
        return (
            <div className={classes.root}>
                <NoSsr>{_this.state.loadDefaultOptions ? (
                    <SelectType
                        defaultOptions
                        cacheOptions
                        loadOptions={(inputValue: any, callback: any) => {
                            _this.loadOptionsFromAPI(inputValue, callback)
                        }}
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
                        {...attributes}
                    />
                ) : ""}
                </NoSsr>
            </div>
        );
    }

}

export default withStyles(ReactSelectStyles)(TrSelect);