export class QuestResultBreakdown {
    basePoints: number;
    relicBonus: number;
    suitedGodBonus: number;
    successChainBonus: number;
    riskBonus: number;
    weaponBonus: number;
    primordialBonus: number;

    constructor(basePoints: number, relicBonus: number, suitedGodBonus: number, successChainBonus: number, riskBonus: number, weaponBonus: number, primordialBonus: number) {
        this.basePoints = basePoints;
        this.relicBonus = relicBonus;
        this.suitedGodBonus = suitedGodBonus;
        this.successChainBonus = successChainBonus;
        this.riskBonus = riskBonus;
        this.weaponBonus = weaponBonus;
        this.primordialBonus = primordialBonus;
    }
}