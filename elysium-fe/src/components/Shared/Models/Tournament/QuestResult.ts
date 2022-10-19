import {QuestResultBreakdown} from "./QuestResultBreakdown";

export class QuestResult {
    isSuccessful: boolean;
    pointsGained: number;
    pointsBreakdown?: QuestResultBreakdown;

    constructor(isSuccessful: boolean, pointsGained: number, pointsBreakdown: QuestResultBreakdown) {
        this.isSuccessful = isSuccessful;
        this.pointsGained = pointsGained;
        this.pointsBreakdown = pointsBreakdown;
    }
}
