import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {Box, TableCell, TableRow, TextField} from "./ui-component";
import React from "react";

class TrSearchState implements TRState {

}

export interface TRSearchProps extends TRProps {
    formData: { [key: string]: any };
    definition: Array<any>
}

export default class TrDetailsView extends TRReactComponent<TRSearchProps, TrSearchState> {

    public getFormData(formData: { [key: string]: any }, name: string, defaultValue: any = "") {
        if (formData && formData[name]) {
            return formData[name];
        }
        return defaultValue;
    }

    render() {
        const {formData, definition} = this.props;
        console.log(formData)
        return (
            <React.Fragment>
                {definition.map((row: any, index: any) => (
                    <TableRow key={index}>
                        <TableCell size="small" align="right" style={{borderColor: "white"}}>
                            <Box fontSize={16} fontWeight="fontWeightMedium">{row.displayName}</Box>
                        </TableCell>
                        <TableCell size="small" align="left" style={{borderColor: "white"}}>
                            <Box fontSize={16} fontWeight="fontWeightBold">{this.getFormData(formData, row.name)}</Box>
                        </TableCell>
                    </TableRow>
                ))}
            </React.Fragment>
        );
    }
}