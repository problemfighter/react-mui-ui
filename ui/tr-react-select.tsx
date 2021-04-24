import React, {CSSProperties, HTMLAttributes} from 'react';
import Select, {
    ControlProps,
    MultiValueProps,
    OptionProps,
    PlaceholderProps,
    SingleValueProps,
    ValueContainerProps
} from 'react-select';
import {createStyles, Theme} from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import TRReactComponent from 'tm-react/src/artifacts/framework/tr-react-component';
import {
    CancelIcon,
    clsx, FormControl, FormHelperText,
    InputLabel,
    MenuItem,
    Paper,
    TextField,
    Typography,
    withStyles
} from 'react-mui-ui/ui/ui-component';
import {TRProps, TRState} from 'tm-react/src/artifacts/model/tr-model';
import {BaseTextFieldProps, Chip, FormLabel, MenuProps} from "@material-ui/core";
import {NoticeProps} from "react-select/src/components/Menu";

export const ReactSelectStyles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            // height: 245,
            minWidth: 200,
            overflow: 'visible'
        },
        input: {
            display: 'flex',
            padding: 0,
            height: 'auto',
        },
        valueContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            flex: 1,
            alignItems: 'center',
            overflow: 'visible',
        },
        chip: {
            margin: theme.spacing(0.5, 0.25),
        },
        noOptionsMessage: {
            padding: theme.spacing(1, 2),
        },
        singleValue: {
            fontSize: 16,
        },
        placeholder: {
            position: 'absolute',
            left: 2,
            bottom: 6,
            fontSize: 16,
        },
        paper: {
            position: 'absolute',
            zIndex: 1000000,
            marginTop: theme.spacing(1),
            left: 0,
            right: 0,
        },
        divider: {
            height: theme.spacing(2),
        },
    });

// @ts-ignore
function NoOptionsMessage(props: NoticeProps<OptionType>) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

type InputComponentProps = Pick<BaseTextFieldProps, 'inputRef'> & HTMLAttributes<HTMLDivElement>;

function inputComponent({inputRef, ...props}: InputComponentProps) {
    return <div ref={inputRef} {...props} />;
}

function Control(props: ControlProps<OptionType, boolean>) {
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

// @ts-ignore
function Option(props: OptionProps<OptionType>) {
    return (
        <MenuItem
            ref={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}>
            {props.children}
        </MenuItem>
    );
}

// @ts-ignore
type MuiPlaceholderProps = Omit<PlaceholderProps<OptionType>, 'innerProps'> & Partial<Pick<PlaceholderProps<OptionType>, 'innerProps'>>;

function Placeholder(props: MuiPlaceholderProps) {
    const {selectProps, innerProps = {}, children} = props;
    return (
        <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
            {children}
        </Typography>
    );
}

function SingleValue(props: SingleValueProps<OptionType>) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

// @ts-ignore
function ValueContainer(props: ValueContainerProps<OptionType>) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props: MultiValueProps<OptionType>) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={clsx(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}

// @ts-ignore
function Menu(props: MenuProps<OptionType>) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    // MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};


interface OptionType {
    label: string;
    value: string;
}

interface Props extends TRProps {
    classes: any;
    isMulti: boolean;
    inputId: string;
    placeholder: string;

    label: string;
    name?: string;
    options: Array<any>;
    optionLabel: string;
    optionValue: string;
    value?: any;
    onChange?: any;
    helperText?: any;
    error?: boolean;
    defaultLabel?: string;
    defaultSelect?: any;
}

class State implements TRState {
    value: any = null;
    options: any = [];
}

class TRReactSelect extends TRReactComponent<Props, State> {

    state: State = new State();

    static defaultProps = {
        isMulti: false,
        inputId: "react-select-single",
        placeholder: "PLACEHOLDER",
    };


    componentDidMount() {
       this.loadOption();
    }

    loadOption(){
        let optionData = this.lisToOptionType(this.props);
        if(optionData){
            this.setState({
                value: optionData.selected,
                options: optionData.options,
            })
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (prevProps.options !== this.props.options || prevProps.value !== this.props.value){
            this.loadOption();
        }
    }


    lisToOptionType(props: Props) {
        let optionData: { [key: string]: any } = {};
        optionData.options = [];
        optionData.selected = null;
        if (props.options && props.optionValue && props.optionLabel) {
            let items: Array<OptionType> = [];

            // let defaultSelect = {value: "empty", label: props.defaultLabel + ""}
            // if (props.defaultLabel !== null) {
            //     // items.push(defaultSelect)
            //     optionData.selected = props.defaultSelect;
            // }

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

    render2() {
        const options = [
            {value: 'chocolate', label: 'Chocolate'},
            {value: 'strawberry', label: 'Strawberry'},
            {value: 'vanilla', label: 'Vanilla'}
        ]


        return (
            <React.Fragment>
                <FormLabel>Name</FormLabel>
                <NoSsr>
                    <Select options={options} isMulti/>
                </NoSsr>
            </React.Fragment>
        )
    }

    render() {
        const {classes, inputId, isMulti, placeholder, label, helperText, error} = this.props;
        let placeholderLabel = label;
        if (placeholder !== "PLACEHOLDER"){
            placeholderLabel = placeholder;
        }

        return (
            <div className={classes.root}>
                <NoSsr>

                    <Select
                        name={this.props.name}
                        value={this.state.value}
                        classes={classes}
                        inputId={inputId}
                        onChange={(data: any) => {
                            this.onChange(data)
                        }}
                        TextFieldProps={{
                            label: label,
                            autoComplete: 'off',
                            helperText: helperText,
                            error: error,
                            InputLabelProps: {
                                htmlFor: inputId,
                                shrink: true,
                            },
                        }}
                        placeholder={placeholderLabel}
                        options={this.state.options}
                        components={components}
                        isMulti={isMulti}
                    />
                </NoSsr>
            </div>
        );
    }

}

export default withStyles(ReactSelectStyles)(TRReactSelect);