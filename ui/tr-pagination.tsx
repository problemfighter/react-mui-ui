import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import React from "react";
import {TablePagination} from "./ui-component";


export default class TRPagination extends TRReactComponent<TRProps, TRState> {


    handleChangePage = (event:any, page:any) => {
        console.log("handleChangePage " +page)
    };

    handleChangeRowsPerPage (event:any) {
        console.log("handleChangeRowsPerPage " + event.target.value)
    };

    render(){
        return (
            <React.Fragment>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={100}
                rowsPerPage={10}
                page={1}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                labelRowsPerPage="Label Rows Per Page"
                onChangePage={(event:any, page:any) => {this.handleChangePage(event, page)}}
                onChangeRowsPerPage={(event:any) => {this.handleChangeRowsPerPage(event)}}
            />
        </React.Fragment>);
    }
}