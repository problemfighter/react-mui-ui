import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import React from "react";
import TRFlashMessage, {Variant} from "./tr-flash-message";
import {
    AccountBoxIcon,
    AddShoppingCartIcon,
    Button,
    ButtonGroup, ContactsIcon,
    DashboardIcon, ListIcon, PeopleIcon, ReportIcon, RowingIcon,
    Table,
    TableBody,
    TableCell,
    TableRow
} from "./ui-component";
import {TRDropdownDataHelper, TRListDataHelper, TRTableActionDataHelper, TRTableHeaderDataHelper} from "./tr-ui-data";
import TRDropdown from "./tr-dropdown";
import TRDialog from "./tr-dialog";
import TRVerticalNestedList from "./tr-vertical-nested-list";
import {TRProgress} from "./tr-progress";
import TRAlertDialog from "./tr-alert-dialog";
import TRTableAction from "./tr-table-action";
import TRTableHeader, {SortDirection} from "./tr-table-header";
import TRDrawer, {SlideSide} from "./tr-drawer";
import {TrUtil} from "tm-react/src/artifacts/util/tr-util";

class DemoState implements TRState{
    public showFlashMessage: boolean = false;
    public showDrawer: boolean = false;
    public showDialog: boolean = false;
    public showAlertDialog: boolean = false;
    public flashMessage: string = "This is Flash Message";
    public flashMessageVariant: Variant = Variant.error;
    public orderBy: string = "id";
    public sortDirection: SortDirection = SortDirection.descending;
}

interface DemoProps extends TRProps{
    showFlashMessage: boolean;
}

const tableHeaderDefinition = TRTableHeaderDataHelper.init("Name", "name");
tableHeaderDefinition.add("Client ID", "client_id");
tableHeaderDefinition.add("Client Secret", "client_secret", false);
tableHeaderDefinition.add("Callback URL", "call_back", false);

const rows = [
    {
        "name": "Name 1",
        "client_id": "5632af9dc3ea45fe80d818b1fe5a77c0",
        "client_secret": "b374d095160b47b0a66b85af2dc9deec",
        "callback_url": "external-plugin-instance/callback",
        "id": 8,
        "uuid": "685CB382-0671-4CDB-8220-68593B874BE8"
    },
    {
        "name": "Name 2",
        "client_id": "5632af9dc3ea45fe80d818b1fe5a77c0",
        "client_secret": "b374d095160b47b0a66b85af2dc9deec",
        "callback_url": "external-plugin-instance/callback",
        "id": 8,
        "uuid": "685CB382-0671-4CDB-8220-68593B874BE8"
    },
    {
        "name": "Name 3",
        "client_id": "5632af9dc3ea45fe80d818b1fe5a77c0",
        "client_secret": "b374d095160b47b0a66b85af2dc9deec",
        "callback_url": "external-plugin-instance/callback",
        "id": 8,
        "uuid": "685CB382-0671-4CDB-8220-68593B874BE8"
    },
];

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

    showDrawer(event: any) {
        this.setState((state: any) =>{
            return {showDrawer: !state.showDrawer};
        })
    }

    showDrawerBoxCancel(event: any) {
        this.setState((state: any) =>{
            return {showDrawer: !state.showDrawer};
        })
        console.log("Cancel")
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

    private drawerContent() {
        return (<React.Fragment>
            <br/><br/>
            This is Drawer Content This is Drawer Content This is Drawer Content This is Drawer Content
            <Button
                variant="contained"
                color="primary" onClick = {(event:any) => {this.showDrawerBoxCancel(event)}}> Close it</Button>
        </React.Fragment>);
    }

    render(){

        let listData: TRListDataHelper = TRListDataHelper.start("dashboard", "Dashboard", DashboardIcon);
        listData.add("product", "Products", AddShoppingCartIcon);
        listData.add("user", "Users", PeopleIcon);
        listData.addChild("acl", "ACL", ListIcon)
            .add("role", "Role", RowingIcon);
        listData.addToParent();

        listData.add("order", "Order", ReportIcon);
        listData.addChild("shipping", "Shipping", AccountBoxIcon)
            .add("payment", "Payment", ContactsIcon);
        listData.addToParent();

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


        let tableAction: TRTableActionDataHelper = TRTableActionDataHelper.commonActions();
        tableAction.getAction("View").setAction(
            {
                click(event: any, onClickData: any): void {
                    console.log("action Performed.")
                    console.log(onClickData)
                }
            }
        ).setCallbackData({name: "Touhid Mia"});

        tableAction.getAction("Delete").setAction(
            {
                click(event: any, onClickData: any): void {
                    console.log("Deleted Confirmed");
                    console.log(onClickData)
                }
            }
        ).setCallbackData({name: "Delete"})
            .updateConfirmationCancelAction(
            {
                click(event: any, onClickData: any): void {
                    console.log("Calcalled");
                }
            });


        let tableHeader = TRTableHeaderDataHelper.init("Name", "id", true, "Sort By Name");


        const component = this;

        let touhid = {
            xy: {
                mia: "vai"
            },
            y: "y"
        };
        console.log(TrUtil.objectValue(touhid, undefined, "xy", "mia"));
        console.log(TrUtil.objectValue(touhid, undefined, "xy", "Y"));
        console.log(TrUtil.objectValue(touhid, undefined, "y"));

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
            <TRDialog isOpen={this.state.showDialog} children={<h1>This is Body Content of the Dialog Box</h1>}
                      title="Hmm Title"
                      autoClose={true}
                      onCloseFunction={
                          {
                              click(event: any, onClickData: any): void {
                                  component.showHideDialogBox(event)
                              }
                          }}
            />

            {this.title("Alert Dialog")}
            <ButtonGroup
                variant="contained"
                color="primary">
                <Button onClick={(event:any) =>{this.showHideDialogAlertBox(event)}}>Show Alert Dialog</Button>
            </ButtonGroup>
            <TRAlertDialog
                isOpen={this.state.showAlertDialog}
                message="Are you sure want to delete?"
                           cancelFunction={{click(event: any, onClickData: any): void {
                               component.dialogAlertBoxCancel(event);
                }}}
                okayFunction={{click(event: any, onClickData: any): void {
                    component.dialogAlertBoxOkay(event);
                }}}/>


            {this.title("Progress Bar")}
            {TRProgress.linear(true)}

            {this.title("Table Action")}
            <TRTableAction actions={tableAction.getMap()}/>


            {this.title("Table Header")}
            <Table>
                <TRTableHeader headers={tableHeader.getHeaders()}
                               orderBy={this.state.orderBy}
                               sortDirection={this.state.sortDirection}
                               enableActionColumn={false}
                               clickForSortFunction={
                                   {
                                       click(event: any, onClickData: any): void {
                                           console.log("Clicked");
                                           if (component.state.sortDirection === SortDirection.ascending){
                                               component.setState({
                                                   sortDirection: SortDirection.descending
                                               })
                                           } else{
                                               component.setState({
                                                   sortDirection: SortDirection.ascending
                                               })
                                           }

                                       }
                                   }
                               }/>
                <TableBody/>
            </Table>

            {this.title("Vertical Nested List")}
            <TRVerticalNestedList itemList={listData.getList()}/>



            {this.title("Drawer")}
            <ButtonGroup
                variant="contained"
                color="primary">
                <Button onClick={(event:any) =>{this.showDrawer(event)}}>Show Drawer Dialog</Button>
            </ButtonGroup>
            <TRDrawer
                onCloseFunction={
                    {
                        click(event: any, onClickData: any): void {
                            // component.showDrawerBoxCancel(event)
                        }
                    }}
                isOpen={this.state.showDrawer}
                bodyContent={this.drawerContent()}
                slideSide={SlideSide.LEFT}
                autoClose={false}/>

            {this.title("Table")}
            <Table>
                <TRTableHeader
                    clickForSortFunction={
                        {
                            click(event: any, onClickData: any): void {
                                console.log("Clicked");
                                if (component.state.sortDirection === SortDirection.ascending){
                                    component.setState({
                                        sortDirection: SortDirection.descending
                                    })
                                } else{
                                    component.setState({
                                        sortDirection: SortDirection.ascending
                                    })
                                }

                            }
                        }
                    }
                    headers={tableHeaderDefinition.getHeaders()}
                    orderBy={this.state.orderBy}
                    sortDirection={this.state.sortDirection}/>
                <TableBody>
                    {rows.map((row: any) => (
                        <TableRow key={row.name} >
                            <TableCell component="th" align="center" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">{row.client_id}</TableCell>
                            <TableCell align="center">{row.client_secret}</TableCell>
                            <TableCell align="center">{row.callback_url}</TableCell>
                            <TableCell align="center">
                                <TRTableAction actions={tableAction.getMap()}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {this.title("Pagination")}
            {this.title("Navigation")}
            {this.title("Searchable Dropdown")}

        </React.Fragment>);
    }




}