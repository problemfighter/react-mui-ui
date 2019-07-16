import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import React from "react";
import {OnActionFunction, TRTableHeaderData} from "./tr-ui-data";
import {TableCell, TableHead, TableRow, TableSortLabel, Tooltip} from "./ui-component";

interface TRTableHeaderProps extends TRProps {
    headers: Array<TRTableHeaderData>;
    sortDirection: SortDirection;
    orderBy: string;
    clickForSortFunction: OnActionFunction;
    enableActionColumn?: boolean;
    actionColumnName?: string;
}

interface TRTableHeaderState extends TRState {}

export enum SortDirection {
    ascending = 'asc',
    descending = 'desc'
}

export default class TRTableHeader extends TRReactComponent<TRTableHeaderProps, TRTableHeaderState> {

    static defaultProps = {
        enableActionColumn: true,
        actionColumnName: "Actions",
        sortDirection: SortDirection.ascending,
    };

    private sortableHandler(definition: TRTableHeaderData, event: any){
        this.props.clickForSortFunction.click(event, definition);
    };

    private enableSorting(sortDirection: SortDirection, orderBy:any, definition:TRTableHeaderData){
        if (!definition.enableSort){
            let title = (definition.tooltip ? definition.tooltip : definition.label);
            return (<Tooltip title={title}><span>{title}</span></Tooltip>);
        } else {
            return (
                <Tooltip
                    title={definition.tooltip ? definition.tooltip : definition.label} enterDelay={300}>
                    <TableSortLabel
                        active={orderBy === definition.fieldName}
                        direction={sortDirection}
                        onClick={(event:any) =>{ this.sortableHandler(definition, event)}}>{definition.label}</TableSortLabel>
                </Tooltip>
            );
        }
    }

    render() {
        const {sortDirection, orderBy, headers, enableActionColumn, actionColumnName} = this.props;
        let actionHeader: any = "";
        if (enableActionColumn) {
            actionHeader = (<TableCell>{actionColumnName}</TableCell>);
        }

        return (<React.Fragment>
            <TableHead>
                <TableRow>
                    {headers.map((definition: TRTableHeaderData) => {
                        return (
                            <TableCell
                                align={definition.align}
                                padding={definition.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === definition.fieldName ? sortDirection : false}>
                                {this.enableSorting(sortDirection, orderBy, definition)}
                            </TableCell>
                        );
                    }, this)}
                    {actionHeader}
                </TableRow>
            </TableHead>
        </React.Fragment>);
    }
}