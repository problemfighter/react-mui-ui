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


// {
//     [...dateJobMap.keys()].map(jobsForDate =>
//         jobsForDate.map(job => (
//             <TruckJobComp job = { job } />
// ))
// )
// }

class TRConfirmAlertDialogProps {
    public cancelFunction?: OnActionFunction;
    public cancelLabel?: string;
    public message?: string;
    public okayFunction?: OnActionFunction;
    public okayLabel?: string;
    public onCloseCallbackData?: any;
    public title?: string;

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

    public addActionCallbackData(actionCallbackData: any): TRTableActionData {
        this.actionCallbackData = actionCallbackData;
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
class TRTableHeaderData {
    public id?: any;
    public numeric: boolean = false;
    public disablePadding: boolean = false;
    public enableSort: boolean = true;
    public label?: string;
    public title?: string;
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
    TRConfirmAlertDialogProps
}