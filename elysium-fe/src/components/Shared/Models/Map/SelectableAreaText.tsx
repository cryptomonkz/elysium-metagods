import {Sizes} from "./Sizes";

export class SelectableAreaText {
    public text: string
    public position: Sizes
    public properties?: any

    constructor(text: string, position: Sizes, properties?: any) {
        this.text = text
        this.position = position
        this.properties = properties
    }
}
