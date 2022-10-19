export default class CelestialsState {
    passesUnstaked: number
    passesStaked: number
    tokensYielded: number

    constructor(passesUnstaked: number, passesStaked: number, tokensYielded: number) {
        this.passesUnstaked = passesUnstaked;
        this.passesStaked = passesStaked;
        this.tokensYielded = tokensYielded;
    }
}

export const getDefaultCelestialsState = (): CelestialsState => ({
    passesUnstaked: 0,
    passesStaked: 0,
    tokensYielded: 0,
})