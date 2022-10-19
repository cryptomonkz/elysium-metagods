import {baseService} from "./BaseService";
import {checkIfRequestIsOkStrict, extractResponseDataStrict} from "../Utils/RequestUtils";
import {PrizeDefinition} from "../Models/Lootboxes/PrizeDefinition";
import {RewardClaimResponse} from "../Models/Lootboxes/RewardClaimResponse";

const LOOTBOX_CONTROLLER = '/api/loot-box'
const BUNDLES_ENDPOINT = `${LOOTBOX_CONTROLLER}/bundles`
const CLAIM_REWARD_ENDPOINT = `${LOOTBOX_CONTROLLER}/reward`

export const doBuyBundle = async (bundleId: number): Promise<void> => {
    try {
        const bundleResponse = await baseService.post<void>(`${BUNDLES_ENDPOINT}/${bundleId}/buy`);
        checkIfRequestIsOkStrict(bundleResponse)
    } catch {
        throw new Error("Failed to buy the requested bundle")
    }
};

export type OpenedBoxResponse = { rouletteItems: PrizeDefinition[], wonItemIndex: number }
export const doOpenBox = async (lootBoxId: number): Promise<OpenedBoxResponse> => {
    try {
        const boxOpenResponse = await baseService.post<OpenedBoxResponse>(`${LOOTBOX_CONTROLLER}/${lootBoxId}/open`);
        return extractResponseDataStrict(boxOpenResponse)
    } catch {
        throw new Error("Failed to open the requested box")
    }
};

export const doClaimReward = async (rewardId: number): Promise<RewardClaimResponse> => {
    try {
        const rewardClaimResponse = await baseService.get<RewardClaimResponse>(`${CLAIM_REWARD_ENDPOINT}/${rewardId}`);
        return extractResponseDataStrict(rewardClaimResponse)
    } catch {
        throw new Error("Failed to claim reward")
    }
};