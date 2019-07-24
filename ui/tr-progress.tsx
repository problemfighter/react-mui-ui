import {Fade, LinearProgress} from "./ui-component";
import React from "react";


export const TRProgress = {
    linear: (state: boolean, color: any = "primary", zIndex: any = 100) => {
        return (
            state ? (
                <React.Fragment>
                    <Fade in={state}>
                        <LinearProgress color={color} style={{ position: 'absolute', top: 0, zIndex: zIndex, left: 0, right: 0 }}/>
                    </Fade>
                </React.Fragment>) : ""
        );
    }
};