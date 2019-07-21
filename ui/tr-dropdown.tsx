import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import React from "react";
import {
    Button,
    ClickAwayListener,
    Grow,
    IconButton,
    ListIcon, Menu,
    MenuItem,
    MenuList,
    MoreVertIcon,
    Paper,
    Popper
} from "./ui-component";
import {DesignProps, TRDropdownData} from "./tr-ui-data";
import {Interface} from "readline";

class TRTableActionState implements TRState {
    public anchorRef: any = React.createRef();
    public open: boolean = false;
}

export interface DropdownStyle {
    actionButton?: DesignProps;
    paper?: DesignProps;
    menuList?: DesignProps;
    menuItem?: DesignProps;
}

class TRTableActionProps implements TRProps {
    public actions: Array<TRDropdownData> = [];
    public dropdownStyle?: DropdownStyle;
}

export default class TRDropdown extends TRReactComponent<TRTableActionProps, TRTableActionState> {


    state: TRTableActionState = new TRTableActionState();

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
        const {dropdownStyle} = this.props;
        return (<React.Fragment>
            <Button
                classes={dropdownStyle ? dropdownStyle!.actionButton!.classes : undefined}
                className={dropdownStyle ? dropdownStyle!.actionButton!.className : undefined}
                style={dropdownStyle ? dropdownStyle!.actionButton!.style : undefined}
                ref={this.state.anchorRef}
                aria-label="More"
                aria-owns={this.state.open ? 'long-menu' : undefined}
                aria-haspopup="true"
                onClick={(event: any) => {this.handleClick(event)}}>
                <MoreVertIcon/>
            </Button>
            <Popper open={this.state.open}
                    anchorEl={this.state.anchorRef}
                    transition>
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{transformOrigin: placement === "bottom" ? "center top" : "center bottom"}}>
                        <Paper
                            classes={dropdownStyle ? dropdownStyle!.paper!.classes : undefined}
                            className={dropdownStyle ? dropdownStyle!.paper!.className : undefined}
                            style={dropdownStyle ? dropdownStyle!.paper!.style : undefined}
                            id="menu-list-grow">
                            <ClickAwayListener onClickAway={(event: any) => {
                                this.handleClose(event)
                            }}>
                                <MenuList
                                    classes={dropdownStyle ? dropdownStyle!.menuList!.classes : undefined}
                                    className={dropdownStyle ? dropdownStyle!.menuList!.className : undefined}
                                    style={dropdownStyle ? dropdownStyle!.menuList!.style : undefined}
                                >
                                    {
                                        this.props.actions.map((definition: TRDropdownData, key: any) => {
                                            return (
                                                <MenuItem
                                                    classes={dropdownStyle ? dropdownStyle!.menuItem!.classes : undefined}
                                                    className={dropdownStyle ? dropdownStyle!.menuItem!.className : undefined}
                                                    style={dropdownStyle ? dropdownStyle!.menuItem!.style : undefined}
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
                    </Grow>
                )}
            </Popper>
        </React.Fragment>);
    }
}