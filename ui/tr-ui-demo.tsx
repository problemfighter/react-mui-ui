import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import React from "react";
import TRFlashMessage, {Variant} from "./tr-flash-message";
import {Button, ButtonGroup, Divider} from "./ui-component";
import {TRDropdownDataHelper, TRTableActionDataHelper} from "./tr-ui-data";
import TRDropdown from "./tr-dropdown";
import TRDialog from "./tr-dialog";
import {TRProgress} from "./tr-progress";
import TRAlertDialog from "./tr-alert-dialog";
import TRTableAction from "./tr-table-action";

class DemoState implements TRState{
    public showFlashMessage: boolean = false;
    public showDialog: boolean = false;
    public showAlertDialog: boolean = false;
    public flashMessage: string = "This is Flash Message";
    public flashMessageVariant: Variant = Variant.error;
}

interface DemoProps extends TRProps{
    showFlashMessage: boolean;
}


export default class TrUiDemo extends TRReactComponent<DemoProps, DemoState> {

    static defaultProps = {};
    state:DemoState = new DemoState();

    closeFlashMessage(event: any) {
        this.setState({
            showFlashMessage: false
        })
    }

    showFlashMessage(event: any, flashMessageVariant: Variant) {
        this.closeFlashMessage(event);
        this.setState({
            showFlashMessage: true,
            flashMessageVariant: flashMessageVariant
        })
    }

    showHideDialogBox(event: any) {
        this.setState((state: any) =>{
            return {showDialog: !state.showDialog};
        })
    }

    showHideDialogAlertBox(event: any) {
        this.setState((state: any) =>{
            return {showAlertDialog: !state.showAlertDialog};
        })
    }

    dialogAlertBoxCancel(event: any) {
        this.setState((state: any) =>{
            return {showAlertDialog: !state.showAlertDialog};
        })
        console.log("Cancel")
    }

    dialogAlertBoxOkay(event: any) {
        this.setState((state: any) =>{
            return {showAlertDialog: !state.showAlertDialog};
        })
        console.log("Okay")
    }


    private title(title: string) {
        return (<React.Fragment>
            <br/><br/>
            <h3>{title}</h3>
        </React.Fragment>);
    }

    render(){

        // Dropdown
        let dropdownList = new TRDropdownDataHelper();
        dropdownList.add("A", "Item A");
        dropdownList.add("B", "Item B", {
            click(event: any, onClickData: any): void {
                console.log("Clicked")
            }
        });
        dropdownList.add("C", "Item C", {
            click(event: any, onClickData: any): void {
                console.log(onClickData)
            }
        }, {name: "C"});
        // Dropdown


        let tableAction:TRTableActionDataHelper = new TRTableActionDataHelper();

        const component = this;
        return (<React.Fragment>

            {this.title("Dropdown")}
            <TRDropdown actions={dropdownList.getList()}/>

            {this.title("Flash Message")}
            <ButtonGroup
                variant="contained"
                color="primary">
                <Button onClick={(event:any) =>{this.showFlashMessage(event, Variant.error)}}>Error Flash</Button>
                <Button onClick={(event:any) =>{this.showFlashMessage(event, Variant.info)}}>Info Flash</Button>
                <Button onClick={(event:any) =>{this.showFlashMessage(event, Variant.success)}}>Success Flash</Button>
                <Button onClick={(event:any) =>{this.showFlashMessage(event, Variant.warning)}}>Warning Flash</Button>
            </ButtonGroup>
            <TRFlashMessage isOpen={this.state.showFlashMessage} message={this.state.flashMessage} variant={this.state.flashMessageVariant} onCloseFunction={(event:any) =>{this.closeFlashMessage(event)}}/>






            {this.title("Dialog")}
            <ButtonGroup
                variant="contained"
                color="primary">
                <Button onClick={(event:any) =>{this.showHideDialogBox(event)}}>Show Dialog Box</Button>
            </ButtonGroup>
            <TRDialog isOpen={this.state.showDialog} children={<h1>This is Body Content of the Dialog Box</h1>}  title="Hmm Title" autoClose={true}
                      onCloseFunction={{click(event: any, onClickData: any): void {
                              component.showHideDialogBox(event)
                }}}/>

            {this.title("Alert Dialog")}
            <ButtonGroup
                variant="contained"
                color="primary">
                <Button onClick={(event:any) =>{this.showHideDialogAlertBox(event)}}>Show Alert Dialog</Button>
            </ButtonGroup>
            <TRAlertDialog isOpen={this.state.showAlertDialog} message="Are you sure want to delete?"
                           cancelFunction={{click(event: any, onClickData: any): void {
                               component.dialogAlertBoxCancel(event);
                }}} okayFunction={{click(event: any, onClickData: any): void {
                    component.dialogAlertBoxOkay(event);
                }}}/>


            {this.title("Progress Bar")}
            {TRProgress.linear(true)}

            {this.title("Table Action")}
            <TRTableAction actions={TRTableActionDataHelper.commonActionMap()}/>


            {this.title("Table Header")}
            {this.title("Table")}
            {this.title("Pagination")}
            {this.title("Navigation")}
            {this.title("Searchable Dropdown")}

        </React.Fragment>);
    }




}