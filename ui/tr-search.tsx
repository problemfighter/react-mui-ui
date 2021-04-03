import {TRProps, TRState} from "tm-react/src/artifacts/model/tr-model";
import TRReactComponent from "tm-react/src/artifacts/framework/tr-react-component";
import {TextField} from "./ui-component";

class TrSearchState implements TRState {

}

export interface TRSearchProps extends TRProps {
    parentState: any
    value?: string
}

export default class TrSearch extends TRReactComponent<TRSearchProps, TrSearchState> {

    search(event: any, component: any) {
        if (event.keyCode === 13) {
            if (event.target.value) {
                component.state.search = event.target.value;
            } else {
                component.state.search = null;
            }
            if (component.loadData) {
                component.loadData();
            }
        }
    }

    render() {
        const _this = this;
        const {parentState, value} = this.props;
        return <TextField placeholder="Search" value={value ? value : ""} name="search" onChange={(event:any) => { parentState.setState({search: event.target.value}) }} onKeyUp={(event: any)=>{_this.search(event, parentState)}}/>
    }
}