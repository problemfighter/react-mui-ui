import {TrUtil} from "tm-react/src/artifacts/util/tr-util";

export default class TRStyleHelper{

    private readonly props: any;

    constructor(props: any) {
        this.props = props
    }

    private getStyle(type: any, style:any){
        return TrUtil.objectValue(this.props, undefined, "dropdownStyle", type, style)
    }

    public className(type: any){
        return this.getStyle(type, "className")
    }
    public classes(type: any){
        return this.getStyle(type, "classes")
    }
    public style(type: any){
        return this.getStyle(type, "style")
    }


}