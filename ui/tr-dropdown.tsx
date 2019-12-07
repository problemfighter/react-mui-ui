import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import React from "react";
import {
    Button,
    ClickAwayListener, Fade,
    Grow,
    MenuItem,
    MenuList,
    MoreVertIcon,
    Paper,
    Popper
} from "./ui-component";
import {DesignProps, TRDropdownData} from "./tr-ui-data";
import TRStyleHelper from "../src/tr-style-helper";


class TRDropdownState implements TRState {
    public anchorRef: any = React.createRef();
    public open: boolean = false;
}

export enum PopperPlacementType {
    BOTTOM_END = 'bottom-end',
    BOTTOM_START = 'bottom-start',
    BOTTOM = 'bottom',
    LEFT_END = 'left-end',
    LEFT_START = 'left-start',
    LEFT = 'left',
    RIGHT_END = 'right-end',
    RIGHT_START = 'right-start',
    RIGHT = 'right',
    TOP_END = 'top-end',
    TOP_START = 'top-start',
    TOP = 'top'
}


export interface DropdownStyle {
    actionButton?: DesignProps;
    paper?: DesignProps;
    menuList?: DesignProps;
    menuItem?: DesignProps;
    popper?: DesignProps;
}

class TRDropdownProps implements TRProps {
    public actions: Array<TRDropdownData> = [];
    public dropdownStyle?: DropdownStyle;
    public popperPlacementType?: PopperPlacementType = PopperPlacementType.BOTTOM_END;
    public fadeTimeout?: number = 350;
    public clickIcon?: any;
    public actionChild?: any;
    public buttonVariant?: any;
    public buttonColor?: any;
}

export default class TRDropdown extends TRReactComponent<TRDropdownProps, TRDropdownState> {

    static defaultProps = {
        popperPlacementType: PopperPlacementType.BOTTOM_END,
        fadeTimeout: 350,
        clickIcon: MoreVertIcon,
        buttonVariant: 'text',
        buttonColor: 'default',
    };

    state: TRDropdownState = new TRDropdownState();

    handleClick = (event: any) => {
        this.setState({anchorRef: event.currentTarget});
        this.setState((state: any) => {
            return {open: !state.open};
        });
    };

    handleClose = (event: any) => {
        if (this.state.anchorRef && this.state.anchorRef.current && this.state.anchorRef.current.contains(event.target)) {
            return;
        }
        this.setState({open: false});
    };



    render() {
        const defStyle: TRStyleHelper = new TRStyleHelper(this.props, "dropdownStyle");
        const {popperPlacementType, fadeTimeout, clickIcon, actionChild, buttonVariant, buttonColor} = this.props;
        const ClickIcon = clickIcon;
        let actionChildView = <ClickIcon/>;
        if (actionChild){
            actionChildView = actionChild;
        }

        return (<React.Fragment>
            <Button
                color={buttonColor}
                variant={buttonVariant}
                classes={ defStyle.classes("actionButton")}
                className={defStyle.className("actionButton")}
                style={defStyle.style("actionButton")}
                ref={this.state.anchorRef}
                onClick={(event: any) => {this.handleClick(event)}}>
                {actionChildView}
            </Button>

            <Popper
                className={defStyle.className("popper")}
                style={defStyle.style("popper")}
                open={this.state.open} anchorEl={this.state.anchorRef} placement={popperPlacementType} transition >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={fadeTimeout}>
                        <Paper
                            classes={ defStyle.classes("paper")}
                            className={defStyle.className("paper")}
                            style={defStyle.style("paper")}
                            id="menu-list-grow">
                            <ClickAwayListener onClickAway={(event: any) => { this.handleClose(event)}}>
                                <MenuList
                                    classes={ defStyle.classes("menuList")}
                                    className={defStyle.className("menuList")}
                                    style={defStyle.style("menuList")}>
                                    {
                                        this.props.actions.map((definition: TRDropdownData, key: any) => {
                                            return (
                                                <MenuItem
                                                    classes={ defStyle.classes("menuItem")}
                                                    className={defStyle.className("menuItem")}
                                                    style={defStyle.style("menuItem")}
                                                    key={key} onClick={event => {
                                                    if (definition.onClickFunction && definition.onClickFunction.click) {
                                                        definition.onClickFunction.click(event, definition.onClickCallbackData);
                                                    }
                                                    this.handleClose(event)
                                                }}>
                                                    {definition.itemContent}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </React.Fragment>);
    }
}