import {Fade, LinearProgress} from "./ui-component";
import React from "react";


export const TRProgress = {
    linear: (state: boolean) => {
        return (
            state ? (<React.Fragment><Fade in={state}><LinearProgress color="primary"/></Fade></React.Fragment>) : ""
        );
    }
};