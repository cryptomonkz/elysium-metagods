import {useDrop} from "react-dnd";
import {CSSProperties} from "react";
import {AbsoluteBorderRadius, Color, FULL_WIDTH} from "../../../Shared/Constants/StylesConstants";
import styled from "styled-components";
import {ItemType} from "../../../Shared/State/GreatHall/ItemType";
import {MIN_CONTAINER_HEIGHT} from "../../../Shared/Components/Drag/Token";
import {PreviewItem} from "../../../Shared/Models/Drag/PreviewItem";
import TokenWithMode from "../Token/TokenWithMode";
import {GenericToken} from "../../../Shared/Models/Token/GenericToken";
import {EnrolledToken} from "../../../Shared/Models/Token/EnrolledToken";
import {playActionSound} from "../../../Shared/State/Sound/SoundService";
import {ACTION_SOUND} from "../../../Shared/State/Sound/SoundState";

const EnrolledTokensContainer = styled.div`
    display: flex;
    flex-flow: wrap;
    ${FULL_WIDTH}
    min-height: ${MIN_CONTAINER_HEIGHT};
`

const getDroppableColor = (canDrop: boolean, isOver: boolean): string => {
    if (canDrop) {
        return Color.TRANSPARENT_WHITE
    }
    if (isOver) {
        return Color.FIRST_THEME_DARK
    }
    return Color.TRANSPARENT
}

const getDroppableStyles = (canDrop: boolean, isOver: boolean): CSSProperties => canDrop || isOver ? {
    borderRadius: AbsoluteBorderRadius.TINY,
    boxShadow: `0 0 30px 5px ${getDroppableColor(canDrop, isOver)} inset`
} : {}

export const DroppableTokensArea = ({tokens, isEnrollmentDisabled, onEnroll}: {
    tokens: EnrolledToken[], isEnrollmentDisabled: boolean, onEnroll: (toEnroll: GenericToken) => void
}) => {
    const [{canDrop, isOver}, dropRef] = useDrop<PreviewItem, void, { canDrop: boolean, isOver: boolean }>(() => ({
        accept: ItemType.GOD,
        collect: monitor => {
            const canDrop = monitor.canDrop(), isOver = monitor.isOver()
            return {canDrop: canDrop && !isOver, isOver: canDrop && isOver}
        },
        canDrop: () => !isEnrollmentDisabled,
        drop: (item) => {playActionSound(ACTION_SOUND.DROP); onEnroll(item.token)}
    }), [isEnrollmentDisabled])
    return <EnrolledTokensContainer ref={dropRef} style={getDroppableStyles(canDrop, isOver)}>
        {tokens.map(enrolledToken => <TokenWithMode key={enrolledToken.token.tokenId} stakedToken={enrolledToken}/>)}
    </EnrolledTokensContainer>
}