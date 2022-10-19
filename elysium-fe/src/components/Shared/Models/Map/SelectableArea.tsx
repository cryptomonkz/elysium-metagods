import {SelectableAreaText} from "./SelectableAreaText";

export class SelectableArea {
    public pathData: string
    public properties?: any
    public selectableText?: SelectableAreaText

    constructor(pathData: string, properties?: any, selectableText?: SelectableAreaText) {
        this.pathData = pathData
        this.properties = properties
        this.selectableText = selectableText
    }
}