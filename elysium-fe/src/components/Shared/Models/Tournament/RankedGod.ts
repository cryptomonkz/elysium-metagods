export class RankedGod {
    rank: number;
    godId: number;
    godName: string;
    walletAddress: string;
    totalPoints: number;
    reward: number;

    constructor(rank: number, godId: number, godName: string, walletAddress: string, totalPoints: number, reward: number) {
        this.rank = rank;
        this.godId = godId;
        this.godName = godName;
        this.walletAddress = walletAddress;
        this.totalPoints = totalPoints;
        this.reward = reward;
    }
}