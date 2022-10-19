import {LootBox} from "./LootBox";

export class Bundle {
    public id: number;
    public price: number;
    public amount: number;
    public stock: number;
    public imageUrl: string;
    public description: string;
    public lootBox: LootBox;

    constructor(id: number, price: number, amount: number, stock: number, imageUrl: string, description: string, lootBox: LootBox) {
        this.id = id;
        this.price = price;
        this.amount = amount;
        this.stock = stock;
        this.imageUrl = imageUrl;
        this.description = description;
        this.lootBox = lootBox;
    }
}