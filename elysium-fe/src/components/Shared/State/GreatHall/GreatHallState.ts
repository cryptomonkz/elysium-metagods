import GreatHallDataState from "./GreatHallDataState";
import EditState from "./EditState";
import ClaimState from "./ClaimState";

export default class GreatHallState {
    public dataState: GreatHallDataState
    public claimState: ClaimState
    public editState?: EditState

    public constructor(dataState: GreatHallDataState, claimState: ClaimState, editState?: EditState) {
        this.dataState = dataState
        this.claimState = claimState
        this.editState = editState
    }
}