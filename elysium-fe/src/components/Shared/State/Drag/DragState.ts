import { RectangleDefinition } from "../../Models/Map/RectangleDefinition"

export default class DragState {
    public isDragging: boolean = false
    public stageState?: RectangleDefinition
    public clientState?: RectangleDefinition

    public constructor(isDragging: boolean, stageState?: RectangleDefinition, clientState?: RectangleDefinition) {
        this.isDragging = isDragging
        this.stageState = stageState
        this.clientState = clientState
    }
}