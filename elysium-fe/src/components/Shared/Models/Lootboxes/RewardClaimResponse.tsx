import {RewardTokenStandard} from "./RewardTokenStandard";

export class RewardClaimResponse {
    public requestIdentifier: number;
    public tokenStandard: RewardTokenStandard;
    public fromAddress: string;
    public collectionAddress: string;
    public tokenId: number;
    public amount: number;
    public signature: string;

    constructor(requestIdentifier: number, tokenStandard: RewardTokenStandard, fromAddress: string, collectionAddress: string, tokenId: number, amount: number, signature: string) {
        this.requestIdentifier = requestIdentifier;
        this.tokenStandard = tokenStandard;
        this.fromAddress = fromAddress;
        this.collectionAddress = collectionAddress;
        this.tokenId = tokenId;
        this.amount = amount;
        this.signature = signature;
    }
}