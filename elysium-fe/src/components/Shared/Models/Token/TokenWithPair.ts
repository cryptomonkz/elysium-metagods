import {GenericToken} from "./GenericToken";

export class TokenWithPair {
    public token: GenericToken
    public pairedToken: GenericToken

    constructor(token: GenericToken, pairedToken: GenericToken) {
        this.token = token;
        this.pairedToken = pairedToken;
    }
}
