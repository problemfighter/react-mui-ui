import React, {CSSProperties, HTMLAttributes} from 'react';
import clsx from 'clsx';
import Select from 'react-select';
import {createStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField, {BaseTextFieldProps} from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import {ValueContainerProps} from 'react-select/src/components/containers';
import {ControlProps} from 'react-select/src/components/Control';
import {MenuProps, NoticeProps} from 'react-select/src/components/Menu';
import {MultiValueProps} from 'react-select/src/components/MultiValue';
import {OptionProps} from 'react-select/src/components/Option';
import {PlaceholderProps} from 'react-select/src/components/Placeholder';
import {SingleValueProps} from 'react-select/src/components/SingleValue';
import {Omit} from '@material-ui/types';
import TRReactComponent from 'tm-react/src/artifacts/framework/tr-react-component';
import {Box, withStyles} from 'react-mui-ui/ui/ui-component';
import {TRProps, TRState} from 'tm-react/src/artifacts/model/tr-model';

export const ReactSelectStyles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            // height: 245,
            minWidth: 200,
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
            overflow: 'hidden',
        },
        chip: {
            margin: theme.spacing(0.5, 0.25),
        },
        // chipFocused: {
        //     backgroundColor: emphasize(
        //         theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
        //         0.08,
        //     ),
        // },
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
            zIndex: 1,
            marginTop: theme.spacing(1),
            left: 0,
            right: 0,
        },
        divider: {
            height: theme.spacing(2),
        },
    });


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

function Control(props: ControlProps<OptionType>) {
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

type MuiPlaceholderProps = Omit<PlaceholderProps<OptionType>, 'innerProps'> &
    Partial<Pick<PlaceholderProps<OptionType>, 'innerProps'>>;

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
    MultiValue,
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
    value?: string;
    onChange?: any;
    helperText?: any;
    error?: boolean;
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
        if (prevProps.options !== this.props.options){
            this.loadOption();
        }
    }


    lisToOptionType(props: Props){
        let optionData : { [key: string]: any } = {};
        optionData.options = [];
        optionData.selected = null;
        if (props.options && props.optionValue && props.optionLabel) {
            let items: Array<OptionType> = [];
            props.options.map(item => {
                items.push({value: item[props.optionValue], label: item[props.optionLabel]})
                if (props.value && props.value == item[props.optionValue]){
                    optionData.selected = {value: item[props.optionValue], label: item[props.optionLabel]}
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

    render() {
        const {classes, inputId, isMulti, placeholder, label, value, helperText, error} = this.props;
        // const theme = useTheme();
        let placeholderLabel = label;
        if (placeholder !== "PLACEHOLDER"){
            placeholderLabel = placeholder;
        }

        const selectStyles = {
            input: (base: CSSProperties) => ({
                ...base,
                // color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        let attributes: { [key: string]: any } = {};

        return (
            <div className={classes.root}>
                <NoSsr>
                    <Select
                        name={this.props.name}
                        value={this.state.value}
                        classes={classes}
                        styles={selectStyles}
                        inputId={inputId}
                        onChange={(data:any) => {this.onChange(data)}}
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