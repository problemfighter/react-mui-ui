import React from 'react';
import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {navAppBarJss} from "../assets/nav-app-bar-jss";
import {
    AppBar, ChevronLeftIcon, ChevronRightIcon,
    clsx,
    CssBaseline, Divider,
    Drawer,
    IconButton, InboxIcon, List, ListItemIcon, ListItemText, MailIcon,
    MenuIcon,
    Toolbar,
    Typography,
    ListItem,
    withStyles, useTheme, Collapse, StarBorderIcon, ExpandLessIcon, ExpandMoreIcon
} from "../ui/ui-component";
import {TRProps} from "tm-react/src/artifacts/model/tr-model";
import {TRListData} from "../ui/tr-ui-data";
import TRVerticalNestedList from '../ui/tr-vertical-nested-list';

export interface Props extends TRProps {
    classes: any
    appTitle?:string
    navTitle?:string
    bodyContent:any
    itemList: Array<TRListData>;
}


class NavAppBar extends TRReactComponent<Props, any> {

    static defaultProps = {
        appTitle: "Application Title",
        navTitle: "Navigation",
        itemList: [],
    };

    constructor(props: Props){
        super(props);
        this.state = {
            open: true
        }
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: this.state.open,
                            })}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            {this.props.appTitle}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        }),
                    }}
                    open={this.state.open}>
                    <div className={classes.toolbar}>
                        <Typography variant="h6" align="inherit">
                            {this.props.navTitle}
                        </Typography>
                        <IconButton onClick={this.handleDrawerClose}>
                             {!this.state.open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                   <TRVerticalNestedList itemList={this.props.itemList}/>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.props.bodyContent}
                </main>
            </div>
        );
    }

}

export default withStyles(navAppBarJss)(NavAppBar);