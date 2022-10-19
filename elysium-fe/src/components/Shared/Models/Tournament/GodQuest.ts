import {QuestStatus} from "./QuestStatus";
import {QuestResult} from "./QuestResult";
import {Quest} from "./Quest";

export class GodQuest {
    id: number;
    status: QuestStatus;
    periodNumber: number;
    riskBonus: number;
    successChance: number;
    result: QuestResult;
    quest: Quest;

    constructor(id: number, status: QuestStatus, dayOfTournament: number, riskBonus: number, successChance: number, result: QuestResult, quest: Quest) {
        this.id = id;
        this.status =  status;
        this.periodNumber = dayOfTournament;
        this.riskBonus = riskBonus;
        this.successChance = successChance;
        this.result = result;
        this.quest = quest;
    }
}