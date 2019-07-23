import React from "react";
import TRComponent from "tm-react/src/artifacts/component/tr-component";
import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import {TrFormDefinitionData} from "tm-react/src/artifacts/data/tr-form-definition-data";
import TRComponentState from "tm-react/src/artifacts/component/tr-component-state";
import {Button, TextField} from "../ui/ui-component";
import {TRMessageData} from "tm-react/src/artifacts/data/tr-message-data";

interface Props extends TRProps{}

class State extends TRComponentState{

}

export default class FormDemo extends TRComponent<Props, State> {


    constructor(props: Props) {
        super(props);
        this.addFormDefinition("email", new TrFormDefinitionData({
            required: true,
            errorMessage: "Please Enter Email Address",
        }));
        this.addFormDefinition("password", new TrFormDefinitionData({
            required: true,
            errorMessage: "Please Enter Password",
            helpText: "Please xyz",
            fillValue: false,
            customValidation: {
                validate(fieldName: string, value: any, formData: { [p: string]: any }): TRMessageData {
                    console.log(fieldName);
                    console.log(value);
                    console.log(formData);
                    return TRMessageData.failed("Sueecss");
                }
            }
        }));
    }

    onSubmit (event: any){
        event.preventDefault();
        this.validateFormInput();
        console.log(this.state.formData);
    }

    renderUI() {
        return (
            <React.Fragment>
                <form onSubmit={(event: any) => {
                    this.onSubmit(event)
                }} noValidate>
                    <TextField {...this.handleInputDataChange("email")}/>
                    <br/>
                    <TextField {...this.handleInputDataChange("password")} type="password"/>
                    <br/>
                    <br/>
                    <Button type="submit" variant="contained">Submit</Button>
                </form>
            </React.Fragment>
        );
    }


}