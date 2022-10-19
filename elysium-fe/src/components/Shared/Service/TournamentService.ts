import {baseService} from "./BaseService";
import {StatusCodes,} from 'http-status-codes';
import {checkIfRequestIsOkStrict} from "../Utils/RequestUtils";

const TOURNAMENT_CONTROLLER = '/api/tournament'
const ENROLL_GODS_ENDPOINT = `${TOURNAMENT_CONTROLLER}/enroll`
const ACCEPT_QUEST_ENDPOINT = `${TOURNAMENT_CONTROLLER}/quests`

export const enrollGods = async (gods: number[]): Promise<void> => {
    const response = await baseService.post<void | string>(ENROLL_GODS_ENDPOINT, {gods});
    if (!response?.ok) {
        const responseMessage = response?.data
        if (response.status === StatusCodes.BAD_REQUEST && responseMessage) {
            throw new Error(responseMessage)
        }
        throw new Error("Failed to enroll gods.")
    }
}

export const acceptQuest = async (godId: number, questId: number): Promise<void> => {
    const response = await baseService.post<void | string>(ACCEPT_QUEST_ENDPOINT, {godId, questId});
    checkIfRequestIsOkStrict(response)
}