import {DeleteIcon, EditIcon, StopIcon, VisibilityIcon} from "./ui-component";

export interface OnActionFunction {
    click(event: any, onClickData: any): void;
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
    public icon: any = StopIcon;
    public confirmation?: TRConfirmAlertDialogProps;


    constructor(label: string, icon?: any, action?: OnActionFunction) {
        this.label = label;
        this.action = action;
        this.icon = icon;
    }

    public setAction(action: OnActionFunction): TRTableActionData{
        this.action = action;
        return this;
    }

    public setCallbackData(actionCallbackData: any): TRTableActionData{
        this.actionCallbackData = actionCallbackData;
        return this;
    }

    public addActionCallbackData(actionCallbackData: any): TRTableActionData {
        this.actionCallbackData = actionCallbackData;
        return this;
    }

    public updateConfirmationAction(okayFunction?: OnActionFunction, cancelFunction?: OnActionFunction): TRTableActionData{
        if (this.confirmation){
            this.confirmation.okayFunction = okayFunction;
            this.confirmation.cancelFunction = cancelFunction;
        }
        return this;
    }

    public updateConfirmationCancelAction(cancelFunction: OnActionFunction): TRTableActionData{
        if (this.confirmation){
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

    public getAction(name: string): any{
        return this.actions.get(name);
    }

    public updateAction(name: string, data: TRTableActionData): TRTableActionDataHelper {
        this.actions.set(name, data);
        return this;
    }

    public getMap(): Map<string, TRTableActionData> {
        return this.actions;
    }

    public addAction(label: string): TRTableActionData | undefined {
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



    constructor(label: string, fieldName: string, enableSort: boolean = true, tooltip?: string) {
        this.fieldName = fieldName;
        this.enableSort = enableSort;
        this.label = label;
        this.tooltip = tooltip;
    }

    public setAlign(align: Align): TRTableHeaderData{
        this.align = align;
        return this;
    }

    public setDisablePadding(disablePadding: boolean): TRTableHeaderData{
        this.disablePadding = disablePadding;
        return this;
    }


    public setEnableSort(enableSort: boolean): TRTableHeaderData{
        this.enableSort = enableSort;
        return this;
    }

    public setTooltip(tooltip: string): TRTableHeaderData{
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

    public add(label: string, fieldName: string, enableSort: boolean = true, tooltip?: string): TRTableHeaderDataHelper {
        this.headers.push(new TRTableHeaderData(label, fieldName, enableSort, tooltip));
        return this;
    }

    public getHeaders(): Array<TRTableHeaderData> {
        return this.headers;
    }

    public static init(label: string, fieldName: string, enableSort: boolean = true, tooltip?: string):TRTableHeaderDataHelper {
        let init: TRTableHeaderDataHelper = new TRTableHeaderDataHelper();
        init.addData(new TRTableHeaderData(label, fieldName, enableSort, tooltip));
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


export {
    TRDropdownData,
    TRDropdownDataHelper,
    TRTableActionDataHelper,
    TRTableActionData,
    TRConfirmAlertDialogProps,
    TRTableHeaderDataHelper,
    TRTableHeaderData
}