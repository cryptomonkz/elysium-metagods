import StyledTable from "../../Shared/Components/Table/StyledTable";
import {useCallback, useEffect, useState} from "react";
import {getRewardHistory} from "../../Shared/Service/PublicLootboxesService";
import {displayTextWithDetail} from "../../Shared/Components/Table/TableText";
import {LootBoxRewardHistory} from "../../Shared/Models/Lootboxes/LootBoxRewardHistory";
import {FairColumn} from "../../Shared/Components/Table/TableColumn";
import {Points} from "../Tournaments/Phases/common/Stats";
import {formatDate} from "../../Shared/Utils/DateUtils";
import {Format} from "../../Shared/Constants/DateConstants";
import {ThemeButton} from "../../Shared/Components/StyledButton";
import {
    FLEX_CENTERED_CONTAINER,
    FontSize,
    fontSizeToPixels,
    FULL_SIZE,
    Spacing
} from "../../Shared/Constants/StylesConstants";
import styled from "styled-components";
import {Tooltip} from "@mui/material";
import {showRewardClaimFailed} from "../../Shared/Utils/ToastUtils";
import {claimReward, getAlreadyClaimedRewards} from "../../Shared/Service/AggregationService";

const LootBoxHistoryContainer = styled.div`
    ${FULL_SIZE}
    padding: ${Spacing.FIFTH} ${Spacing.THIRD};
    text-align: start;
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
`

const OpenedOnText = styled(Points)`
    font-size: ${fontSizeToPixels(FontSize.ALMOST_MEDIUM)};
`

const IconWithTextContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
`

const IconForText = styled.img`
    min-width: 50px;
    max-width: 50px;
    object-fit: contain;
    margin-right: ${Spacing.SECOND};
    
    &:hover {
        transform: scale(3);
    }
`

const TextForIcon = styled.div`
    flex: 1;
`

const displayIconWithText = (imageURL: string, imageDescription: string, title: string, detail: string) => {
    return <IconWithTextContainer>
        <Tooltip title={imageDescription} arrow>
            <IconForText src={imageURL}/>
        </Tooltip>
        <TextForIcon>{displayTextWithDetail(title, detail)}</TextForIcon>
    </IconWithTextContainer>
}

const displayLootbox = (historyEntry: LootBoxRewardHistory) => {
    return displayIconWithText(historyEntry.lootBox.imageUrl, historyEntry.lootBox.description, 'Loot Box', historyEntry.lootBox.name)
}

const displayReward = (historyEntry: LootBoxRewardHistory) => {
    return displayIconWithText(historyEntry.reward.imageUrl, historyEntry.reward.description, 'Reward', historyEntry.reward.name)
}

const displayOpenedOn = (historyEntry: LootBoxRewardHistory) => {
    return <OpenedOnText>{formatDate(Format.DATE_WITH_TIME, historyEntry.openedOn)}</OpenedOnText>
}

const RewardClaimButton = ({historyEntry, claimReward, rewardInProgress, alreadyClaimedRewards}:{
    historyEntry: LootBoxRewardHistory,
    claimReward: (reward: LootBoxRewardHistory) => void,
    rewardInProgress?: LootBoxRewardHistory,
    alreadyClaimedRewards: number[],
}) => {
    const [isClaimed, setIsClaimed] = useState(false)

    useEffect(() => {
        setIsClaimed(historyEntry.reward.isOnChain && alreadyClaimedRewards.includes(historyEntry.id))
    }, [historyEntry, alreadyClaimedRewards])

    return historyEntry.reward.isOnChain ? <ThemeButton
        label={isClaimed ? "CLAIMED" : "CLAIM"} disabled={!!rewardInProgress || isClaimed}
        loading={!!rewardInProgress && rewardInProgress.id === historyEntry.id}
        onClick={() => claimReward(historyEntry)}/> : <></>
}

const LootboxHistory = ({account}: { account: string }) => {
    const [rewardInProgress, setRewardInProgress] = useState<LootBoxRewardHistory | undefined>(undefined)
    const [alreadyClaimedRewards, setAlreadyClaimedRewards] = useState<number[]>([])

    const getData = useCallback(async (page: number, size: number) => {
        const rewardHistory = await getRewardHistory(account, {page, size})
        const rewardIds = (rewardHistory?.content || []).filter(reward => reward.reward.isOnChain).map(reward => reward.id)
        setAlreadyClaimedRewards(await getAlreadyClaimedRewards(rewardIds))
        return rewardHistory
    }, [account])

    const doClaim = useCallback((reward: LootBoxRewardHistory) => {
        setRewardInProgress(reward)
        claimReward(account, reward.id)
            .then(() => setAlreadyClaimedRewards(prev => [...(prev || []), reward.id]))
            .catch(() => showRewardClaimFailed()).finally(() => setRewardInProgress(undefined))
    }, [account])

    return <LootBoxHistoryContainer>
        <StyledTable
            title={'History'}
            getData={getData}
            emptyMessage={"You have not opened so far any of the available boxes. Please check the shop for more details."}>
            <FairColumn header="" body={displayOpenedOn}/>
            <FairColumn header="" body={displayLootbox}/>
            <FairColumn header="" body={displayReward}/>
            <FairColumn header="" body={entry => <RewardClaimButton
                historyEntry={entry} claimReward={doClaim}
                rewardInProgress={rewardInProgress} alreadyClaimedRewards={alreadyClaimedRewards}/>}/>
        </StyledTable>
    </LootBoxHistoryContainer>
}

export default LootboxHistory