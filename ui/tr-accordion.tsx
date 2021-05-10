import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Box, Divider,
    ExpandMoreIcon,
    TableCell,
    TableRow,
    TextField,
    Typography
} from "./ui-component";
import React from "react";

class TrState implements TRState {
    public isExpanded: boolean = false
}

export interface TrProps extends TRProps {
    name: string
    children: any
    isExpanded?: boolean
}

export default class TrAccordion extends TRReactComponent<TrProps, TrState> {

    state: TrState = new TrState();

    componentDidMount() {
        let isItExpanded = false
        if (this.props.isExpanded) {
            isItExpanded = true
        }
        this.setState({isExpanded: isItExpanded})
    }

    onChange() {
        this.setState({isExpanded: !this.state.isExpanded})
    }


    render() {
        const {name, children} = this.props
        return (
            <React.Fragment>
                <Accordion expanded={this.state.isExpanded} onChange={(event: any) => {this.onChange()}}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <Box fontSize={14} fontWeight="fontWeightBold">
                            {name}
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        {children}
                    </AccordionDetails>
                </Accordion>
            </React.Fragment>
        );
    }
}