import Web3 from "web3"
import {Contract} from 'web3-eth-contract'

export default class Web3State {
    public web3?: Web3
    public godsContract?: Contract
    public weaponsContract?: Contract
    public tokensContract?: Contract
    public mintPassContract?: Contract
    public mintPassStakingContract?: Contract
    public lootBoxRewardContract?: Contract

    public constructor(
        web3?: Web3,
        godsContract?: Contract,
        weaponsContract?: Contract,
        tokensContract?: Contract,
        mintPassContract?: Contract,
        mintPassStakingContract?: Contract,
        lootBoxRewardContract?: Contract,
    ) {
        this.web3 = web3
        this.godsContract = godsContract
        this.weaponsContract = weaponsContract
        this.tokensContract = tokensContract
        this.mintPassContract = mintPassContract
        this.mintPassStakingContract = mintPassStakingContract
        this.lootBoxRewardContract = lootBoxRewardContract
    }
}