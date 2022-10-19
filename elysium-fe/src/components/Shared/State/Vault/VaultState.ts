export default class VaultState {
    inGameBalance: number
    blockedBalance: number
    claimableBalance: number
    externalWalletBalance: number
    claimablePasses: number
    unstakedMetaGods: number
    stakedMetaGods: number

    constructor(
        inGameBalance: number, blockedBalance: number, claimableBalance: number, externalWalletBalance: number,
        claimablePasses: number, unstakedMetaGods: number, stakedMetaGods: number
    ) {
        this.inGameBalance = inGameBalance;
        this.blockedBalance = blockedBalance;
        this.claimableBalance = claimableBalance;
        this.externalWalletBalance = externalWalletBalance;
        this.claimablePasses = claimablePasses;
        this.unstakedMetaGods = unstakedMetaGods;
        this.stakedMetaGods = stakedMetaGods;
    }
}

export const getDefaultVaultState = (): VaultState => ({
    inGameBalance: 0,
    blockedBalance: 0,
    externalWalletBalance: 0,
    claimableBalance: 0,
    claimablePasses: 0,
    unstakedMetaGods: 0,
    stakedMetaGods: 0,
})