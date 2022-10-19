import GreatHallDataState from "./GreatHallDataState";
import {EditMode} from "./EditMode";
import {DragArea} from "./DragItem";
import {GenericToken} from "../../Models/Token/GenericToken";

export type EditOperation = { token: GenericToken, source: DragArea, destination: DragArea, ignorable: boolean }

export default class EditState {
    public editOperations: Map<string, EditOperation>
    public initialData: GreatHallDataState
    public editMode: EditMode

    public constructor(editMode: EditMode, initialData: GreatHallDataState) {
        this.editMode = editMode
        this.initialData = initialData
        this.editOperations = new Map<string, EditOperation>()
    }
}