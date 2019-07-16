import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import React from "react";
import {
    OnActionFunction,
    TRConfirmAlertDialogProps,
    TRDropdownData,
    TRDropdownDataHelper,
    TRTableActionData
} from "./tr-ui-data";
import TRDropdown from "./tr-dropdown";
import TRAlertDialog from "./tr-alert-dialog";

class TRTableActionState implements TRState {
    public showConfirmation: boolean = false;
}

interface TRTableActionProps extends TRProps {
    actions: Map<string, TRTableActionData>;
}

export default class TRTableAction extends TRReactComponent<TRTableActionProps, TRTableActionState> {


    state: TRTableActionState = new TRTableActionState();
    private confirmProps: TRConfirmAlertDialogProps = new TRConfirmAlertDialogProps();

    private getName(label: string, icon: any) {
        const Icon = icon;
        return (<React.Fragment>
            {(<Icon/> ) } {label}
        </React.Fragment>)
    }

    private closeConfirmation(){
        this.setState({
            showConfirmation: false
        });
    }

    private clickActionProcess(data: TRTableActionData) {
        const _this = this;
        if (data.confirmation) {
            return {
                click: (event: any, onClickData: any) => {
                    let confirmProps = data.confirmation ? Object.create(data.confirmation): this.confirmProps;
                    this.setState({
                        showConfirmation: true,
                    });
                    confirmProps.cancelFunction = {
                        click(event: any, _onClickData: any): void {
                          if (data.confirmation && data.confirmation.cancelFunction){
                                data.confirmation.cancelFunction.click(event, onClickData);
                            }
                            _this.closeConfirmation();
                        }
                    };

                    confirmProps.okayFunction = {
                        click(event: any, _onClickData: any): void {
                            if (data.action){
                                data.action.click(event, onClickData)
                            } else if (data.confirmation && data.confirmation.okayFunction){
                                data.confirmation.okayFunction.click(event, onClickData);
                            }
                            _this.closeConfirmation();
                        }
                    };
                    _this.confirmProps = confirmProps;
                }
            }
        } else {
            return {
                click: (event: any, onClickData: any) => {
                    if (data.action) {
                        data.action.click(event, onClickData);
                    }
                }
            }
        }
    }

    private processData(): Array<TRDropdownData> {
        let dropdownList = new TRDropdownDataHelper();
        this.props.actions.forEach((data: TRTableActionData, name: string) => {
                dropdownList.add(name, this.getName(name, data.icon), this.clickActionProcess(data), data.actionCallbackData);
        });
        return dropdownList.getList();
    }

    private getConfirmDialog(show: boolean, _confirmProps: TRConfirmAlertDialogProps) {
        return (<TRAlertDialog
            isOpen={show}
            message={_confirmProps.message}
            okayFunction={_confirmProps.okayFunction}
            okayLabel={_confirmProps.okayLabel}
            cancelFunction={_confirmProps.cancelFunction}
            cancelLabel={_confirmProps.cancelLabel}
            onCloseCallbackData={_confirmProps.onCloseCallbackData}
        />)
    }


    render() {
        return (<React.Fragment>
            {this.state.showConfirmation ? (this.getConfirmDialog(this.state.showConfirmation, this.confirmProps)) : ""}
            <TRDropdown actions={this.processData()}/>
        </React.Fragment>);
    }

}