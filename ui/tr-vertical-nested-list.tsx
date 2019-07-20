import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import React from "react";
import {TRListData} from "./tr-ui-data";
import {
    Collapse, createStyles,
    Icon,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Theme, withStyles
} from "./ui-component";

const style = (theme: Theme) => createStyles({
    nested: {
        paddingLeft: theme.spacing(4),
    }
});

class TRVerticalNestedState implements TRState {
    public collapsible: Map<string, boolean> = new Map<string, boolean>();
}

export interface TRVerticalNestedProps extends TRProps {
    itemList: Array<TRListData>;
    classes: any
}

class TRVerticalNestedList extends TRReactComponent<TRVerticalNestedProps, TRVerticalNestedState> {

    state: TRVerticalNestedState = new TRVerticalNestedState();
    static defaultProps = {};
    constructor(props: TRVerticalNestedProps){
        super(props);
    }

    componentDidUpdate(prevProps: TRVerticalNestedProps) {}

    private getIcon(icon: any): any {
        if (!icon) {
            return ""
        }
        const RenderIcon = icon;
        return(
            <ListItemIcon>
                {typeof icon === "string" ? (
                    <Icon>{icon}</Icon>
                ) : (
                    <RenderIcon/>
                )}
            </ListItemIcon>
        );
    }

    private getMapKey(index: any) {
        return index + "mapKey";
    }

    private onClickItem(event: any, data: TRListData, index: any) {
        if (data.action && data.action.click) {
            data.action.click(event, data.actionCallbackData);
        }
        if (data.nested && data.nested.length) {
            let mapKey = this.getMapKey(index);
            this.setState((state: any) => {
                let map = state.collapsible;
                let toggle = !map.get(mapKey)
                map.set(mapKey, toggle);
                console.log(state);
                console.log(map);
                console.log(toggle);
                state.collapsible.set(mapKey, toggle)
                return {collapsible: state.collapsible}
            });
            console.log(this.state.collapsible)
        }
    }

    private processCollapsible(classes: any, index: any, data: TRListData) {
        let view: any = "";
        if (data.nested && data.nested.length) {
            let mapKey = this.getMapKey(index);
            this.state.collapsible.set(mapKey, false);
            let ExpandLess = data.expandLessIcon;
            let ExpandMore = data.expandMoreIcon;
            {
                view = this.state.collapsible.get(mapKey) ? <ExpandMore/> : <ExpandLess/>
            }
            return (
                <React.Fragment>
                    {view}
                    <Collapse in={this.state.collapsible.get(mapKey)} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {this.getListItem(data.nested, classes)}
                        </List>
                    </Collapse>
                </React.Fragment>
            );
        }
        return view;
    }


    private getListItem(itemList: Array<TRListData>, classes?: any) {
        return (
            itemList.map((data: TRListData, index: any) => {
                return (
                    <ListItem className={classes!.nested}
                              button key={data.name} onClick={(event: any) => {
                        this.onClickItem(event, data, index)}}>
                        {this.getIcon(data.icon)}
                        <ListItemText primary={data.label}/>
                        {this.processCollapsible(classes, index, data)}
                    </ListItem>
                );
            })
        );
    }

    render(){
        const {classes, itemList} = this.props;
        console.log(this.getListItem(itemList, classes));
        return (
            <React.Fragment>
                <List>
                    {this.getListItem(itemList, classes)}
                </List>
            </React.Fragment>
        );
    }
}

export default withStyles(style)(TRVerticalNestedList);


