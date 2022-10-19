import {Moment} from "moment";
import {LootBox} from "./LootBox";
import {LootBoxItem} from "./LootBoxItem";

export class LootBoxRewardHistory {
    public id: number;
    public openedOn: Moment;
    public lootBox: LootBox;
    public reward: LootBoxItem;

    constructor(id: number, openedOn: Moment, lootBox: LootBox, reward: LootBoxItem) {
        this.id = id;
        this.openedOn = openedOn;
        this.lootBox = lootBox;
        this.reward = reward;
    }
}