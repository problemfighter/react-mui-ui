import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import React from "react";
import {DesignProps, TRListData} from "./tr-ui-data";
import {
    Button, clsx,
    Collapse, createStyles,
    Icon,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Theme, withStyles
} from "./ui-component";
import TRStyleHelper from "../src/tr-style-helper";

const style = (theme: Theme) => createStyles({
    nested: {
        paddingLeft: theme.spacing(4),
    }
});

class TRVerticalNestedState implements TRState {
    public collapsible: {[key: string]: any} = {};
}

export interface NestedListStyle {
    list?: DesignProps;
    collapseList?: DesignProps;
    listItem?: DesignProps;
    collapse?: DesignProps;
    listItemIcon?: DesignProps;
    listItemText?: DesignProps;
}

export interface TRVerticalNestedProps extends TRProps {
    itemList: Array<TRListData>;
    classes: any
    allOpen: boolean
    nestedListStyle?: NestedListStyle
}

class TRVerticalNestedList extends TRReactComponent<TRVerticalNestedProps, TRVerticalNestedState> {

    state: TRVerticalNestedState = new TRVerticalNestedState();
    static defaultProps = {
        allOpen: true
    };
    private defStyle: TRStyleHelper = new TRStyleHelper(this.props, "nestedListStyle");
    constructor(props: TRVerticalNestedProps){
        super(props);
    }

    private getIcon(icon: any): any {
        if (!icon) {
            return ""
        }
        const RenderIcon = icon;
        return(
            <ListItemIcon
                classes={ this.defStyle.classes("listItemIcon")}
                className={this.defStyle.className("listItemIcon")}
                style={this.defStyle.style("listItemIcon")}
            >
                {typeof icon === "string" ? (
                    <Icon>{icon}</Icon>
                ) : (
                    <RenderIcon/>
                )}
            </ListItemIcon>
        );
    }

    private getMapKey(index: any) {
        return "map_key_" + index;
    }

    private onClickItem(event: any, data: TRListData, index: any) {
        if (data.action && data.action.click) {
            data.action.click(event, data.actionCallbackData);
        }
        if (data.nested && data.nested.length) {
            let mapKey = this.getMapKey(index);
            this.setState((state: any) => {
                let map = {...state.collapsible};
                map[mapKey] = !map[mapKey];
                if (!this.props.allOpen){
                    for (let item in map) {
                        if (mapKey !== item){
                            map[item] = false
                        }
                    }
                }
                return {collapsible: map};
            });
        }
    }

    private processCollapsibleArrow(index: any, data: TRListData) {
        let view: any = "";
        if (data.nested && data.nested.length) {
            let mapKey = this.getMapKey(index);
            let ExpandLess = data.expandLessIcon;
            let ExpandMore = data.expandMoreIcon;
            {
                view = this.state.collapsible[mapKey] ? <ExpandMore/> : <ExpandLess/>
            }
        }
        return view;
    }

    private processCollapsible(classes: any, index: any, data: TRListData) {
        let view: any = "";
        if (data.nested && data.nested.length) {
            let mapKey = this.getMapKey(index);
            this.state.collapsible.mapKey = true;
            return (
                <Collapse
                    classes={ this.defStyle.classes("collapse")}
                    className={this.defStyle.className("collapse")}
                    style={this.defStyle.style("collapse")}
                    in={this.state.collapsible[mapKey]} timeout="auto" unmountOnExit>
                    <List
                        classes={ this.defStyle.classes("collapseList")}
                        className={this.defStyle.className("collapseList")}
                        style={this.defStyle.style("collapseList")}
                        component="div" disablePadding>
                        {this.getListItem(data.nested, classes, classes)}
                    </List>
                </Collapse>
            );
        }
        return view;
    }


    private getListItem(itemList: Array<TRListData>, styleClass: any, classes?: any) {
        let nested = classes ? classes.nested : undefined;
        return (
            itemList.map((data: TRListData, index: any) => {
                return (
                    <React.Fragment key={index}>
                        <ListItem
                            classes={ this.defStyle.classes("listItem")}
                            style={this.defStyle.style("listItem")}
                            className={clsx(this.defStyle.className("listItem"), nested)}
                            button key={data.name} onClick={(event: any) => {
                            this.onClickItem(event, data, index)
                        }}>
                            {this.getIcon(data.icon)}
                            <ListItemText primary={data.label}/>
                            {this.processCollapsibleArrow(index, data)}
                        </ListItem>
                        {this.processCollapsible(styleClass, index, data)}
                    </React.Fragment>
                );
            })
        );
    }

    render(){
        const {classes, itemList} = this.props;
        return (
            <React.Fragment>
                <List
                    classes={ this.defStyle.classes("list")}
                    className={this.defStyle.className("list")}
                    style={this.defStyle.style("list")}>
                    {this.getListItem(itemList, classes)}
                </List>
            </React.Fragment>
        );
    }
}

export default withStyles(style)(TRVerticalNestedList);


