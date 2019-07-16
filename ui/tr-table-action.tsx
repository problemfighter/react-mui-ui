import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import React from "react";
import {TRDropdownData, TRDropdownDataHelper, TRTableActionData} from "./tr-ui-data";
import TRDropdown from "./tr-dropdown";
import {ListItemIcon} from "./ui-component";

class TRTableActionState implements TRState {
    public anchorRef:any = React.createRef();
    public open:boolean = false;
}

interface TRTableActionProps extends TRProps {
    actions: Map<string, TRTableActionData>;
}

export default class TRTableAction extends TRReactComponent<TRTableActionProps, TRTableActionState> {


    state: TRTableActionState = new TRTableActionState();

    private getName(label: string, icon: any) {
        const Icon = icon;
        return (<React.Fragment>
            {(<Icon/> ) } {label}
        </React.Fragment>)
    }

    private processData(): Array<TRDropdownData> {
        let dropdownList = new TRDropdownDataHelper();
        this.props.actions.forEach((data: TRTableActionData, name: string) => {
                dropdownList.add(name, this.getName(name, data.icon));
        });
        return dropdownList.getList();
    }

    render() {
        return (<React.Fragment>
            <TRDropdown actions={this.processData()}/>
        </React.Fragment>);
    }
}