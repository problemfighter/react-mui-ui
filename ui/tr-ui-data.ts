import {DeleteIcon, EditIcon, ExpandLessIcon, ExpandMoreIcon, StopIcon, VisibilityIcon} from "./ui-component";
import {Classes} from "jss";
import * as React from "react";


export interface OnActionFunction {
    click(event: any, onClickData: any): void;
}

export interface DesignProps {
    classes?: Classes;
    style?: React.CSSProperties;
    className?: string;
}


// DROP DOWN DATA
class TRDropdownData {
    public uniqueName?: string;
    public itemContent: any;
    public onClickFunction?: OnActionFunction;
    public onClickCallbackData!: any;

    constructor(uniqueName?: string, itemContent?: any, onClickFunction?: OnActionFunction, onClickCallbackData?: any) {
        this.uniqueName = uniqueName;
        this.itemContent = itemContent;
        this.onClickFunction = onClickFunction;
        this.onClickCallbackData = onClickCallbackData;
    }
}

class TRDropdownDataHelper {
    private actions: Array<TRDropdownData> = [];

    public addAction(action: TRDropdownData) {
        this.actions.push(action)
    }

    public add(uniqueName: string, itemContent: any, onClickFunction?: OnActionFunction, onClickCallbackData?: any): TRDropdownDataHelper {
        this.actions.push(new TRDropdownData(uniqueName, itemContent, onClickFunction, onClickCallbackData))
        return this;
    }

    public getList(): Array<TRDropdownData> {
        return this.actions;
    }

    public static instance(): TRDropdownDataHelper {
        return new TRDropdownDataHelper();
    }
}

// DROP DOWN DATA


class TRConfirmAlertDialogProps {
    public cancelFunction?: OnActionFunction;
    public cancelLabel?: string = "Cancel";
    public message: string = "Seems Something happening wrong!";
    public okayFunction?: OnActionFunction;
    public okayLabel?: string = "Confirm";
    public onCloseCallbackData?: any;
    public title?: string = "Confirm";

}

// TABLE ACTION DATA
class TRTableActionData {
    public label?: string;
    public url?: string;
    public action?: OnActionFunction;
    public actionCallbackData?: any;
    public icon?: any = StopIcon;
    public confirmation?: TRConfirmAlertDialogProps;


    constructor(label: string, icon?: any, action?: OnActionFunction) {
        this.label = label;
        this.action = action;
        this.icon = icon;
    }

    public setUrl(url: string): TRTableActionData {
        this.url = url;
        return this;
    }

    public setActionCallbackData(actionCallbackData: any): TRTableActionData {
        this.actionCallbackData = actionCallbackData;
        return this;
    }

    public setIcon(icon: any): TRTableActionData {
        this.icon = icon;
        return this;
    }

    public setAction(action: OnActionFunction): TRTableActionData {
        this.action = action;
        return this;
    }

    public setCallbackData(actionCallbackData: any): TRTableActionData {
        this.actionCallbackData = actionCallbackData;
        return this;
    }

    public addActionCallbackData(actionCallbackData: any): TRTableActionData {
        this.actionCallbackData = actionCallbackData;
        return this;
    }

    public updateConfirmationAction(okayFunction?: OnActionFunction, cancelFunction?: OnActionFunction): TRTableActionData {
        if (this.confirmation) {
            this.confirmation.okayFunction = okayFunction;
            this.confirmation.cancelFunction = cancelFunction;
        }
        return this;
    }

    public updateConfirmationCancelAction(cancelFunction: OnActionFunction): TRTableActionData {
        if (this.confirmation) {
            this.confirmation.cancelFunction = cancelFunction;
        }
        return this;
    }

    public addConfirmation(): TRTableActionData {
        let confirmation = new TRConfirmAlertDialogProps()
        confirmation.title = "Confirm";
        confirmation.message = "Are you sure want to delete?";
        confirmation.okayLabel = "Confirm";
        confirmation.cancelLabel = "Cancel";
        this.confirmation = confirmation;
        return this;
    }

    public static instance(label: string, icon?: any, action?: OnActionFunction) {
        return new TRTableActionData(label, icon, action)
    }
}

class TRTableActionDataHelper {

    private actions: Map<string, TRTableActionData> = new Map<string, TRTableActionData>();

    public getAction(name: string): any {
        return this.actions.get(name);
    }

    public updateAction(name: string, data: TRTableActionData): TRTableActionDataHelper {
        this.actions.set(name, data);
        return this;
    }

    public getMap(): Map<string, TRTableActionData> {
        return this.actions;
    }

    public addAction(label: string): TRTableActionData | any {
        this.actions.set(label, TRTableActionData.instance(label));
        return this.actions.get(label);
    }

    public static commonActions(actionCallbackData?: any) {
        let trTableActionDataHelper: TRTableActionDataHelper = new TRTableActionDataHelper();
        trTableActionDataHelper.actions.set("View", new TRTableActionData("View", VisibilityIcon).addActionCallbackData(actionCallbackData));
        trTableActionDataHelper.actions.set("Edit", new TRTableActionData("Edit", EditIcon).addActionCallbackData(actionCallbackData));
        trTableActionDataHelper.actions.set("Delete", new TRTableActionData("Delete", DeleteIcon).addActionCallbackData(actionCallbackData).addConfirmation());
        return trTableActionDataHelper;
    }

    public static commonActionMap(actionCallbackData?: any) {
        return this.commonActions(actionCallbackData).getMap();
    }

}

// TABLE ACTION DATA


// TABLE HEADER DATA
export enum Align {
    inherit = 'inherit',
    left = 'left',
    right = 'right',
    center = 'center',
    justify = 'justify',
}

class TRTableHeaderData {
    public align: Align = Align.center;
    public disablePadding: boolean = false;
    public enableSort: boolean = true;
    public label?: string;
    public tooltip?: string;
    public fieldName?: string;


    constructor(label: string, fieldName: string, enableSort: boolean = true, tooltip?: string, align: Align = Align.center) {
        this.fieldName = fieldName;
        this.enableSort = enableSort;
        this.label = label;
        this.tooltip = tooltip;
        this.align = align;
    }

    public setAlign(align: Align): TRTableHeaderData {
        this.align = align;
        return this;
    }

    public setDisablePadding(disablePadding: boolean): TRTableHeaderData {
        this.disablePadding = disablePadding;
        return this;
    }


    public setEnableSort(enableSort: boolean): TRTableHeaderData {
        this.enableSort = enableSort;
        return this;
    }

    public setTooltip(tooltip: string): TRTableHeaderData {
        this.tooltip = tooltip;
        return this;
    }

}

class TRTableHeaderDataHelper {
    private headers: Array<TRTableHeaderData> = [];

    public addData(data: TRTableHeaderData): TRTableHeaderDataHelper {
        this.headers.push(data);
        return this;
    }

    public add(label: string, fieldName: string, enableSort: boolean = true, tooltip?: string, align: Align = Align.center): TRTableHeaderDataHelper {
        this.headers.push(new TRTableHeaderData(label, fieldName, enableSort, tooltip, align));
        return this;
    }

    public getHeaders(): Array<TRTableHeaderData> {
        return this.headers;
    }

    public static init(label: string, fieldName: string, enableSort: boolean = true, tooltip?: string, align: Align = Align.center): TRTableHeaderDataHelper {
        let init: TRTableHeaderDataHelper = new TRTableHeaderDataHelper();
        init.addData(new TRTableHeaderData(label, fieldName, enableSort, tooltip).setAlign(align));
        return init;
    }
}

// TABLE HEADER DATA


// PAGINATION DATA
class TRPaginationData {
    public total: number = 0;
    public itemPerPage: number = 0;
    public offset: number = 0;
    public component: any = "div";
    public backButtonProps: any = "Previous Page";
    public nextButtonProps: any = "Next Page";
    public itemPerPageDropdown: Array<number> = [10, 20, 50, 100, 500, 1000];
}

// PAGINATION DATA

// SELECT DATA
class TRSelectData {
    public total: number = 0;
    public itemPerPage: number = 0;
    public offset: number = 0;
    public component: any = "div";
    public backButtonProps: any = "Previous Page";
    public nextButtonProps: any = "Next Page";
    public itemPerPageDropdown: Array<number> = [10, 20, 50, 100, 500, 1000];
}

// SELECT DATA

// LIST DATA
class TRListData {
    public icon: any;
    public label?: string;
    public name?: string;
    public action?: OnActionFunction;
    public actionCallbackData?: any;
    public expandLessIcon: any = ExpandLessIcon;
    public expandMoreIcon: any = ExpandMoreIcon;
    public nested: Array<TRListData> = [];


    constructor(name: string, label: string, icon?: any, action?: OnActionFunction, actionCallbackData?: any, nested: Array<TRListData> = [], expandLessIcon: any = ExpandLessIcon, expandMoreIcon: any = ExpandMoreIcon) {
        this.icon = icon;
        this.label = label;
        this.name = name;
        this.action = action;
        this.expandLessIcon = expandLessIcon;
        this.expandMoreIcon = expandMoreIcon;
        this.actionCallbackData = actionCallbackData;
        this.nested = nested;
    }

    public setIcon(icon: any): TRListData {
        this.icon = icon;
        return this;
    }

    public setAction(action: any): TRListData {
        this.action = action;
        return this;
    }

    public setActionCallbackData(actionCallbackData: any): TRListData {
        this.actionCallbackData = actionCallbackData;
        return this;
    }

    public setExpandLessIcon(expandLessIcon: any): TRListData {
        this.expandLessIcon = expandLessIcon;
        return this;
    }

    public setNested(nested: Array<TRListData>): TRListData {
        this.nested = nested;
        return this;
    }

    public addNestedItem(nested: TRListData): TRListData {
        this.nested.push(nested);
        return this;
    }
}

class TRListDataHelper {
    private mainListMap: Map<string, TRListData> = new Map<string, TRListData>();
    private key: string;
    private child?: TRListDataHelper;

    constructor(name: string, label: string, icon?: any, action?: OnActionFunction, actionCallbackData?: any) {
        this.key = name;
        this.mainListMap.set(name, new TRListData(name, label, icon, action, actionCallbackData))
    }

    add(name: string, label: string, icon?: any, action?: OnActionFunction, actionCallbackData?: any): TRListDataHelper {
        this.key = name;
        this.mainListMap.set(name, new TRListData(name, label, icon, action, actionCallbackData))
        return this;
    }

    public more(): any {
        return this.mainListMap.get(this.key)
    }

    public getMap(): Map<string, TRListData> {
        return this.mainListMap;
    }

    public getList(): Array<TRListData> {
        let list: Array<TRListData> = [];
        this.mainListMap.forEach((data: TRListData, name: string) => {
            list.push(data);
        });

        return list;
    }

    public static start(name: string, label: string, icon?: any, action?: OnActionFunction, actionCallbackData?: any): TRListDataHelper {
        return new TRListDataHelper(name, label, icon, action, actionCallbackData)
    }

    public addChild(name: string, label: string, icon?: any, action?: OnActionFunction, actionCallbackData?: any): TRListDataHelper {
        this.child = new TRListDataHelper(name, label, icon, action, actionCallbackData)
        return this.child;
    }

    public addToParent(): TRListDataHelper {
        if (this.child) {
            this.mainListMap!.get(this.key)!.setNested(this.child.getList())
        }
        this.child = undefined;
        return this;
    }
}

// LIST DATA

export {
    TRDropdownData,
    TRDropdownDataHelper,
    TRTableActionDataHelper,
    TRTableActionData,
    TRConfirmAlertDialogProps,
    TRTableHeaderDataHelper,
    TRTableHeaderData,
    TRListData,
    TRListDataHelper
}