import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {Box, CardContent, Grid, TableCell, TableRow, TextField, Typography} from "./ui-component";
import React from "react";

class TrSearchState implements TRState {

}

export interface TRSearchProps extends TRProps {
    formData: { [key: string]: any };
    definition: Array<any>
}

export default class TrDetailsGridView extends TRReactComponent<TRSearchProps, TrSearchState> {

    public getFormData(formData: { [key: string]: any }, name: string, defaultValue: any = "") {
        if (formData && formData[name]) {
            return formData[name];
        }
        return defaultValue;
    }

    private getGridSize(row: any, defaultSize: any = 3) {
        if (row && row['size']) {
            return row['size']
        }
        return defaultSize
    }

    private getValue(formData: { [key: string]: any }, definition: any, defaultValue: any = "") {
        if (definition && definition['callback'] && typeof definition['callback'] === 'function') {
            return definition['callback'](definition, formData)
        } else if (formData && formData[definition.name]) {
            return formData[definition.name];
        } else {
            return defaultValue
        }
    }

    private getView(definition: any) {
        let value = this.getValue(this.props.formData, definition)
        let _this = this;
        if (value !== undefined) {
            return (
                <Grid item xs={_this.getGridSize(definition)}>
                    <Typography variant="subtitle2" gutterBottom>
                        <Box fontWeight="fontWeightBold">{definition.displayName}</Box>
                        <Typography variant="subtitle1" gutterBottom>
                            {value}
                        </Typography>
                    </Typography>
                </Grid>
            )
        } else {
            return ""
        }
    }

    render() {
        const {formData, definition} = this.props;
        let _this = this;
        return (
            <React.Fragment>
                {definition.map((row: any, index: any) => _this.getView(row))}
            </React.Fragment>
        );
    }
}