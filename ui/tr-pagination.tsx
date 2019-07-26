import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import React from "react";
import {TablePagination} from "./ui-component";


export interface TRPaginationAction {
    nextPrevious(event: any, offset: number): void
    onChangeItemPerPage(event: any): void
}

interface Props extends TRProps {
    total: number
    itemPerPage: number
    page: number
    trPaginationAction: TRPaginationAction
    itemPerPageDropdown?: Array<number>
    itemPerPageLabel?: string
}


export default class TRPagination extends TRReactComponent<Props, TRState> {

    static defaultProps = {
        itemPerPageLabel: "Item Per Page",
        itemPerPageDropdown: [10, 20, 50, 100, 200]
    };

    render() {
        const {total, itemPerPage, page, trPaginationAction, itemPerPageLabel, itemPerPageDropdown} = this.props;
        return (
            <React.Fragment>
                <TablePagination
                    rowsPerPageOptions={itemPerPageDropdown}
                    component="div"
                    count={total}
                    rowsPerPage={itemPerPage}
                    page={page}
                    labelRowsPerPage={itemPerPageLabel}
                    onChangePage={(event: any, page: any) => {
                        trPaginationAction.nextPrevious(event, page)
                    }}
                    onChangeRowsPerPage={(event: any) => {
                        trPaginationAction.onChangeItemPerPage(event)
                    }}
                />
            </React.Fragment>);
    }
}