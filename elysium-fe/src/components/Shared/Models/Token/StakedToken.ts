import {GenericToken} from "./GenericToken";
import {StakeMode} from "./StakeMode";
import {TokenWithPair} from "./TokenWithPair";

export class StakedToken extends TokenWithPair {
    public stakeType: StakeMode

    constructor(token: GenericToken, pairedToken: GenericToken, stakeType: StakeMode) {
        super(token, pairedToken);
        this.stakeType = stakeType;
    }
}
