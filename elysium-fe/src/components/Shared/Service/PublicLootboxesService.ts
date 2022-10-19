import {Bundle} from "../Models/Lootboxes/Bundle";
import {OwnedLootBox} from "../Models/Lootboxes/OwnedLootBox";
import {PageResponse} from "../Models/Request/PageResponse";
import {LootBoxRewardHistory} from "../Models/Lootboxes/LootBoxRewardHistory";
import {baseService} from "./BaseService";
import {createRequestOptions, extractResponseDataIfOk} from "../Utils/RequestUtils";
import {mapFromServerDate} from "../Utils/DateUtils";
import {LootBox} from "../Models/Lootboxes/LootBox";
import {LootBoxItem} from "../Models/Lootboxes/LootBoxItem";

const PUBLIC_LOOT_BOX_CONTROLLER = '/api/public/loot-box'
const BUNDLES_ENDPOINT = `${PUBLIC_LOOT_BOX_CONTROLLER}/bundles`
const OWNED_BOXES_ENDPOINT = `${PUBLIC_LOOT_BOX_CONTROLLER}/owned`
const REWARD_HISTORY_ENDPOINT = `${PUBLIC_LOOT_BOX_CONTROLLER}/reward-history`

const mapRewardsDate = (rewardsPage?: PageResponse<LootBoxRewardHistoryResponse>): PageResponse<LootBoxRewardHistory> | undefined => {
    return !!rewardsPage ? {
        ...rewardsPage,
        content: rewardsPage.content.map(reward => ({
            ...reward,
            openedOn: mapFromServerDate(reward.openedOn)
        }))
    } : undefined
}

export const getAvailableBundles = async (): Promise<Bundle[]> => {
    try {
        const response = await baseService.get<Bundle[]>(BUNDLES_ENDPOINT)
        return extractResponseDataIfOk(response) || []
    } catch {
        return []
    }
}

export const getOwnedBoxes = async (account: string): Promise<OwnedLootBox[]> => {
    try {
        const response = await baseService.get<OwnedLootBox[]>(`${OWNED_BOXES_ENDPOINT}/${account}`)
        return extractResponseDataIfOk(response) || []
    } catch {
        return []
    }
}

export type LootBoxRewardHistoryResponse = {
    id: number,
    openedOn: string,
    lootBox: LootBox,
    reward: LootBoxItem,
}
export const getRewardHistory = async (account: string, options: any = {}): Promise<PageResponse<LootBoxRewardHistory> | undefined> => {
    try {
        const response = await baseService.get<PageResponse<LootBoxRewardHistoryResponse>>(`${REWARD_HISTORY_ENDPOINT}/${account}`, createRequestOptions(options))
        return mapRewardsDate(extractResponseDataIfOk(response))
    } catch {
        return undefined
    }
}