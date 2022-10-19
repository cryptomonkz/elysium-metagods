import {GodQuest} from "../../../../Shared/Models/Tournament/GodQuest";
import {
    Color, DEFAULT_BUTTON_HEIGHT,
    FLEX_CENTERED_CONTAINER, FontFamily,
    FontSize,
    fontSizeToPixels, FontWeight, NO_USER_SELECT,
    Spacing, Z_INDEX
} from "../../../../Shared/Constants/StylesConstants";
import styled from "styled-components";
import {HighlightedText} from "../../../../Shared/Components/HighlightedText";
import SectionBackground from "../../../../../assets/Images/sectionBackground.png";
import {FullSizeImage} from "../../../../Shared/Components/FullSizeImage";
import {ThemeButton} from "../../../../Shared/Components/StyledButton";

const DetailsContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    justify-content: space-between;
`

const QuestDescription = styled.div`
    flex: 1;
    font-weight: ${FontWeight.SMALL};
    font-size: ${fontSizeToPixels(FontSize.SMALLER)};
    margin: ${Spacing.SECOND} ${Spacing.SECOND} ${Spacing.SECOND} 0;
`

const QuestChance = styled.div`
    position: relative;
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    align-items: flex-start;
    padding: ${Spacing.SECOND};
    ${NO_USER_SELECT}
    font-size: ${fontSizeToPixels(FontSize.SMALL_TO_MEDIUM)};
`

const ChanceBackgroundImage = styled(FullSizeImage)`
    z-index: ${Z_INDEX.RELATIVE_FIRST};
`

const ChanceTitle = styled.div`
    font-weight: ${FontWeight.SMALL};
    margin: ${Spacing.FIRST} ${Spacing.SECOND};
`

const ChanceValue = styled(HighlightedText)`
    color: ${Color.GREEN_DARK};
`

const Chance = styled.div`
    z-index: ${Z_INDEX.RELATIVE_SECOND};
    ${FLEX_CENTERED_CONTAINER}
`

const ExtraDetails = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
`

const AssignButton = styled(ThemeButton)`
    ${DEFAULT_BUTTON_HEIGHT}
    margin-bottom: ${Spacing.SECOND};
    font-family: ${FontFamily.HU_THE_GAME};
    padding: ${Spacing.FIRST} !important;
`

const QuestDetails = ({questData, withAccept, onAccept}:{
    questData: GodQuest, withAccept: boolean, onAccept?: (questId: number) => void
}) => {
    return <DetailsContainer>
        <QuestDescription>{questData.quest.description}</QuestDescription>
        <ExtraDetails>
            {withAccept && <AssignButton
                onClick={() => !!onAccept && onAccept(questData.id)}>ACCEPT QUEST</AssignButton>}
            <QuestChance>
                <ChanceBackgroundImage src={SectionBackground} alt={"SectionBackground"}/>
                <Chance>
                    <ChanceTitle>SUCCESS CHANCE:</ChanceTitle>
                    <HighlightedText>{questData.successChance || 0}%</HighlightedText>
                </Chance>
                <Chance>
                    <ChanceTitle>REWARD BONUS:</ChanceTitle>
                    <ChanceValue>{questData.riskBonus || 0}%</ChanceValue>
                </Chance>
            </QuestChance>
        </ExtraDetails>
    </DetailsContainer>
}

export default QuestDetails