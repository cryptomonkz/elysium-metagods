import {LootBox} from "./LootBox";

export class LootBoxItem {
    public id: number;
    public name: string;
    public description: string;
    public imageUrl: string;
    public isOnChain: boolean;
    public lootBox?: LootBox;

    constructor(id: number, name: string, description: string, imageUrl: string, isOnChain: boolean, lootBox: LootBox) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.isOnChain = isOnChain;
        this.lootBox = lootBox;
    }
}