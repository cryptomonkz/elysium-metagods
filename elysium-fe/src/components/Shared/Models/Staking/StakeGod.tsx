import {StakeMode} from "../Token/StakeMode";

export class StakeGod {
    public godId: number
    public stakingMode: StakeMode

    constructor(godId: number, stakingMode: StakeMode) {
        this.godId = godId;
        this.stakingMode = stakingMode;
    }
}