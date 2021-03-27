import React, {CSSProperties, HTMLAttributes} from 'react';
import Select from 'react-select';
import {createStyles, Theme} from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import TRReactComponent from 'tm-react/src/artifacts/framework/tr-react-component';
import {withStyles} from 'react-mui-ui/ui/ui-component';
import {TRProps, TRState} from 'tm-react/src/artifacts/model/tr-model';

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
            zIndex: 1000000,
            marginTop: theme.spacing(1),
            left: 0,
            right: 0,
        },
        divider: {
            height: theme.spacing(2),
        },
    });



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
    defaultLabel?: string;
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

            let defaultSelect = {value: "empty", label: props.defaultLabel + ""}
            if (props.defaultLabel !== null) {
                items.push(defaultSelect)
                optionData.selected = defaultSelect;
            }

            props.options.map(item => {
                items.push({value: item[props.optionValue], label: item[props.optionLabel]})
                if (props.value && props.value === item[props.optionValue]) {
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
                        // styles={selectStyles}
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
                        // components={components}
                        isMulti={isMulti}
                    />
                </NoSsr>
            </div>
        );
    }

}

export default withStyles(ReactSelectStyles)(TRReactSelect);