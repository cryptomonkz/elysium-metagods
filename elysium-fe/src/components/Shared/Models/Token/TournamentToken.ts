import {StakeMode} from "./StakeMode";
import {EnrolledToken} from "./EnrolledToken";
import {GenericToken} from "./GenericToken";

export enum GodTournamentStatus {
    AWAITS_QUEST = 'AWAITS_QUEST',
    IN_QUEST = 'IN_QUEST',
    NO_QUEST = 'NO_QUEST',
}

export const getGodTournamentStatusText = (status: GodTournamentStatus) => {
    switch (status) {
        case GodTournamentStatus.AWAITS_QUEST:
            return "Awaits quest assignation"
        case GodTournamentStatus.IN_QUEST:
            return "Quest assigned"
        case GodTournamentStatus.NO_QUEST:
            return "No assignable quest. Your MetaGod needs to be staked for you to be assigned quests"
        default:
            throw new Error("Status text has not been defined.")
    }
}

export class TournamentToken extends EnrolledToken {
    public totalPoints: number;
    public position: number;
    public successfulQuests: number;
    public weaponQuestBonus: number;
    public godTournamentStatus: GodTournamentStatus;

    constructor(token: GenericToken, pairedToken: GenericToken, stakeType: StakeMode, totalPoints: number, position: number, successfulQuests: number, weaponQuestBonus: number, godTournamentStatus: GodTournamentStatus) {
        super(token, pairedToken, stakeType);
        this.totalPoints = totalPoints;
        this.position = position;
        this.successfulQuests = successfulQuests;
        this.weaponQuestBonus = weaponQuestBonus;
        this.godTournamentStatus = godTournamentStatus;
    }
}
