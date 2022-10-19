import {AreaType, getDragArea} from "../../../Shared/State/GreatHall/AreaType";
import {DragItem} from "../../../Shared/State/GreatHall/DragItem";
import {ConnectDropTarget, useDrop} from "react-dnd";
import {CSSProperties, ReactElement} from "react";
import {signalDrop} from "../../../Shared/State/GreatHall/GreatHallService";
import {
    AbsoluteBorderRadius,
    Color,
    FLEX_CENTERED_CONTAINER,
    FULL_SIZE,
    OverflowYContainer
} from "../../../Shared/Constants/StylesConstants";
import {GenericToken} from "../../../Shared/Models/Token/GenericToken";
import styled from "styled-components";
import TokensList from "./TokenList";
import {ItemType} from "../../../Shared/State/GreatHall/ItemType";
import {doesEditModeAllowDroppingItem} from "../../../Shared/State/GreatHall/EditMode";
import {MIN_CONTAINER_HEIGHT} from "../../../Shared/Components/Drag/Token";
import {playActionSound} from "../../../Shared/State/Sound/SoundService";
import {ACTION_SOUND} from "../../../Shared/State/Sound/SoundState";

const DroppableTokensArea = ({children, area, type}: {
    children: (ref: ConnectDropTarget, canDrop: boolean, isOver: boolean) => ReactElement,
    area: string, type: ItemType
}) => {
    const dragArea = getDragArea(area)
    const [{canDrop, isOver}, dropRef] = useDrop<DragItem, void, { canDrop: boolean, isOver: boolean }>(() => ({
        accept: type,
        collect: monitor => {
            const canDrop = monitor.canDrop(), isOver = monitor.isOver()
            return {canDrop: canDrop && !isOver, isOver: canDrop && isOver}
        },
        canDrop: (item) => doesEditModeAllowDroppingItem(item.token, item.sourceArea, dragArea),
        drop: (item) => {playActionSound(ACTION_SOUND.DROP); signalDrop(item, dragArea)}
    }), [area])
    return children(dropRef, canDrop, isOver)
}

const UnstakedTokensContainer = styled.div`
    ${OverflowYContainer}
    flex: 1;
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
    justify-content: flex-start;
`

const StakedTokensContainer = styled.div`
    display: flex;
    flex-flow: wrap;
    ${FULL_SIZE}
    min-height: ${MIN_CONTAINER_HEIGHT};
`

const getDroppableContainerColor = (canDrop: boolean, isOver: boolean): string => {
    if (canDrop) {
        return Color.TRANSPARENT_WHITE
    }
    if (isOver) {
        return Color.FIRST_THEME_DARK
    }
    return Color.TRANSPARENT
}

const getDroppableContainerStyles = (canDrop: boolean, isOver: boolean): CSSProperties => canDrop || isOver ? {
    borderRadius: AbsoluteBorderRadius.TINY,
    boxShadow: `0 0 30px 5px ${getDroppableContainerColor(canDrop, isOver)} inset`
} : {}

export const UnstakedTokens = ({area, type, tokens = []}: {
    area: AreaType, type: ItemType, tokens: GenericToken[]
}) => <DroppableTokensArea area={area} type={type}>
    {(dropRef, canDrop, isOver) => <UnstakedTokensContainer
        ref={dropRef} style={getDroppableContainerStyles(canDrop, isOver)}>
        <TokensList area={area} tokens={tokens}/>
    </UnstakedTokensContainer>}
</DroppableTokensArea>

export const StakedTokens = ({withPair = false, area, type, tokens = []}: {
    withPair?: boolean, area: AreaType, type: ItemType, tokens: GenericToken[], additionalStyles?: CSSProperties
}) => <DroppableTokensArea area={area} type={type}>
    {(dropRef, canDrop, isOver) => <StakedTokensContainer
        ref={dropRef} style={getDroppableContainerStyles(canDrop, isOver)}>
        <TokensList withPair={withPair} area={area} tokens={tokens}/>
    </StakedTokensContainer>}
</DroppableTokensArea>

export const DroppablePairedTokenArea = ({children, area, type}: {
    children: (ref: ConnectDropTarget, styles: CSSProperties) => ReactElement, area: string, type: ItemType
}) => <DroppableTokensArea area={area} type={type}>
    {(dropRef, canDrop, isOver) => children(dropRef, getDroppableContainerStyles(canDrop, isOver))}
</DroppableTokensArea>
