import {StakeMode} from "./StakeMode";
import {TokenWithPair} from "./TokenWithPair";
import {GenericToken} from "./GenericToken";

export class EnrolledToken extends TokenWithPair {
    public stakeType?: StakeMode

    constructor(token: GenericToken, pairedToken: GenericToken, stakeType: StakeMode) {
        super(token, pairedToken);
        this.stakeType = stakeType;
    }
}
