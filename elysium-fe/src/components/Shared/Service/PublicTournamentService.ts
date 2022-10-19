import {Tournament} from "../Models/Tournament/Tournament";
import {mapFromServerDate} from "../Utils/DateUtils";
import {baseService} from "./BaseService";
import {createRequestOptions, extractResponseDataIfOk, extractResponseDataStrict} from "../Utils/RequestUtils";
import {TournamentToken} from "../Models/Token/TournamentToken";
import {EnrolledToken} from "../Models/Token/EnrolledToken";
import {GodQuest} from "../Models/Tournament/GodQuest";
import {PageResponse} from "../Models/Request/PageResponse";
import {RankedGod} from "../Models/Tournament/RankedGod";
import {Moment} from "moment";

const PUBLIC_TOURNAMENT_CONTROLLER = '/api/public/tournament'
const ACTIVE_TOURNAMENT_ENDPOINT = `${PUBLIC_TOURNAMENT_CONTROLLER}/current`
const NEXT_QUEST_ENDPOINT = `${PUBLIC_TOURNAMENT_CONTROLLER}/current/next-quest`
const ENROLLMENT_STATUS_ENDPOINT = `${PUBLIC_TOURNAMENT_CONTROLLER}/enrollment-status`
const ENROLLED_GODS_ENDPOINT = `${PUBLIC_TOURNAMENT_CONTROLLER}/enrolled`
const GOD_QUESTS_ENDPOINT = `${PUBLIC_TOURNAMENT_CONTROLLER}/quests`
const LEADERBOARD_ENDPOINT = `${PUBLIC_TOURNAMENT_CONTROLLER}/leaderboard`

const mapTournamentDate = (tournament: TournamentResponse): Tournament => new Tournament(
    tournament.tournamentNumber,
    tournament.enrollmentFee,
    mapFromServerDate(tournament.enrollmentStartTime),
    mapFromServerDate(tournament.enrollmentEndTime),
    mapFromServerDate(tournament.tournamentStartTime),
    mapFromServerDate(tournament.tournamentEndTime),
)

export type TournamentResponse = {
    tournamentNumber: number,
    enrollmentFee: number,
    enrollmentStartTime: string,
    enrollmentEndTime: string,
    tournamentStartTime: string,
    tournamentEndTime: string,
}
export const getActiveTournament = async (): Promise<Tournament | undefined> => {
    try {
        const response = await baseService.get<TournamentResponse>(ACTIVE_TOURNAMENT_ENDPOINT)
        const foundTournament = extractResponseDataStrict(response)
        return mapTournamentDate(foundTournament)
    } catch {
        return undefined
    }
}

export type NextQuestResponse = { nextQuestsAssignation: string, currentQuestsDistributed: boolean }
export type NextQuestMappedResponse = { nextQuestsAssignation: Moment, currentQuestsDistributed: boolean }
export const getNextQuestStatus = async (): Promise<NextQuestMappedResponse | undefined> => {
    try {
        const response = await baseService.get<NextQuestResponse>(NEXT_QUEST_ENDPOINT)
        const nextQuestData = extractResponseDataStrict(response)
        return { ...nextQuestData, nextQuestsAssignation: mapFromServerDate(nextQuestData.nextQuestsAssignation)}
    } catch {
        return undefined
    }
}

export type EnrollmentStatusResponse = { availableGods: EnrolledToken[], enrolledGods: EnrolledToken[] }
const getEmptyEnrollmentStatusResponse = (): EnrollmentStatusResponse => ({availableGods: [], enrolledGods: []})
export const getEnrollmentStatus = async (account: string): Promise<EnrollmentStatusResponse> => {
    try {
        const response = await baseService.get<EnrollmentStatusResponse>(`${ENROLLMENT_STATUS_ENDPOINT}/${account}`)
        return extractResponseDataIfOk(response) || getEmptyEnrollmentStatusResponse()
    } catch {
        return getEmptyEnrollmentStatusResponse()
    }
}

export const getEnrolledGods = async (account: string): Promise<TournamentToken[]> => {
    try {
        const response = await baseService.get<TournamentToken[]>(`${ENROLLED_GODS_ENDPOINT}/${account}`)
        return extractResponseDataIfOk(response) || []
    } catch {
        return []
    }
}

export type GodQuestsResponse = { currentQuests: GodQuest[], assignableQuests: GodQuest[], previousQuests: GodQuest[] }
export const getEmptyGodQuestsResponse = (): GodQuestsResponse => ({ currentQuests: [], assignableQuests: [], previousQuests: [] })
export const getGodQuests = async (tokenId: number): Promise<GodQuestsResponse> => {
    try {
        const response = await baseService.get<GodQuestsResponse>(`${GOD_QUESTS_ENDPOINT}/${tokenId}`)
        return extractResponseDataIfOk(response) || getEmptyGodQuestsResponse()
    } catch {
        return getEmptyGodQuestsResponse()
    }
}

export const getLeaderboard = async (options: any = {}): Promise<PageResponse<RankedGod> | undefined> => {
    try {
        const response = await baseService.get<PageResponse<RankedGod>>(LEADERBOARD_ENDPOINT, createRequestOptions(options))
        return extractResponseDataIfOk(response)
    } catch {
        return undefined
    }
}