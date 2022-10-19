import {LootBox} from "./LootBox";

export class OwnedLootBox {
    public amount: number;
    public lootBox: LootBox;

    constructor(amount: number, lootBox: LootBox) {
        this.amount = amount;
        this.lootBox = lootBox;
    }
}