import {GenericToken} from "../../../Shared/Models/Token/GenericToken";
import {DragItem} from "../../../Shared/State/GreatHall/DragItem";
import {ConnectDragSource, useDrag} from "react-dnd";
import {BOX_SHADOW_STYLE} from "../../../Shared/Constants/StylesConstants";
import {CSSProperties, forwardRef, ReactElement, useEffect, useState} from "react";
import {CONTAINER_MARGIN, TOKEN_HIGHLIGHT_PROPERTIES, PairedToken, Token} from "../../../Shared/Components/Drag/Token";
import {AreaType, buildPairedArea, getDragArea} from "../../../Shared/State/GreatHall/AreaType";
import {DroppablePairedTokenArea} from "./DroppableTokensArea";
import {getAcceptedPairType} from "../../../Shared/State/GreatHall/ItemType";
import {useSelector} from "react-redux";
import {ApplicationState} from "../../../Shared/State/ApplicationState";
import {getPairedAreaStateFromApplication} from "../../../Shared/State/GreatHall/GreatHallDataService";
import {doesEditModeAllowDraggingItem, EditMode} from "../../../Shared/State/GreatHall/EditMode";
import {getEditModeFromState} from "../../../Shared/State/GreatHall/GreatHallService";
import styled from "styled-components";
import {Claimable, ClaimableTokenContainer} from "./Claimable";

const TokenContainer = styled.div`
    margin: ${CONTAINER_MARGIN};
`

const getDraggableContainerStyles = (canDrag: boolean, isDragging: boolean): CSSProperties => canDrag || isDragging ?
    TOKEN_HIGHLIGHT_PROPERTIES : {}

const getPairedDraggableContainerStyles = (canDrag: boolean, isDragging: boolean): CSSProperties => canDrag || isDragging ?
    { boxShadow: BOX_SHADOW_STYLE.PAIRED_TOKEN_HIGHLIGHT } : {}

const DraggableTokenArea = ({children, area, token}: {
    children: (ref: ConnectDragSource, canDrag: boolean, isDragging: boolean) => ReactElement,
    area: string, token: GenericToken
}) => {
    const dragArea = getDragArea(area)
    const editMode = useSelector<ApplicationState, EditMode | undefined>(applicationState => (
        getEditModeFromState(applicationState)
    ))
    const [{canDrag, isDragging}, dragRef] = useDrag<DragItem, void, { canDrag: boolean, isDragging: boolean }>(() => ({
        type: token.type,
        item: { token, sourceArea: dragArea },
        collect: (monitor) => {
            const canDrag = monitor.canDrag(), isDragging = monitor.isDragging()
            return {canDrag: canDrag && !isDragging, isDragging: isDragging }
        },
        canDrag: () => doesEditModeAllowDraggingItem(token, dragArea)
    }), [area, token, editMode])
    return children(dragRef, canDrag, isDragging)
}

const DraggableTokenWithoutPair = ({area, token}: { area: AreaType, token: GenericToken }) => {
    return <DraggableTokenArea area={area} token={token}>
        {(dragRef, canDrag, isDragging) => <TokenContainer>
            <Token ref={dragRef} token={token} styles={getDraggableContainerStyles(canDrag, isDragging)}/>
        </TokenContainer>}
    </DraggableTokenArea>
}

const DraggableTokenWithPair = ({area, token}: { area: AreaType, token: GenericToken }) => {
    const [pairedTokenArea, setPairedTokenArea] = useState<string | undefined>()
    useEffect(() => setPairedTokenArea(buildPairedArea(token)), [token])
    return <>{pairedTokenArea && <DraggableTokenArea area={area} token={token}>
        {(dragRef, canDrag, isDragging) => <DroppablePairedTokenArea
            area={pairedTokenArea} type={getAcceptedPairType(token.type)}>
            {(dropRef, styles) => <TokenContainer>
                <div ref={dropRef} style={styles}>
                        <TokenWithPair ref={dragRef} token={token}
                                       canDrag={canDrag} isDragging={isDragging} area={pairedTokenArea}/>
                </div>
            </TokenContainer>}
        </DroppablePairedTokenArea>}
    </DraggableTokenArea>}</>
}

const TokenWithPair = forwardRef(({token, canDrag, isDragging, area}: {
    token: GenericToken, canDrag: boolean, isDragging: boolean, area: string
}, tokenRef) => {
    const pairedToken = useSelector<ApplicationState, GenericToken | undefined>(applicationState => (
        getPairedAreaStateFromApplication(area, applicationState)
    ))
    return <Token ref={tokenRef} token={token}
                  styles={getDraggableContainerStyles(canDrag, isDragging)}>
        {pairedToken && <DraggablePairedToken area={area} token={pairedToken}/>}
        <ClaimableTokenContainer>
            <Claimable token={token} pairedToken={pairedToken}/>
        </ClaimableTokenContainer>
    </Token>
})

const DraggablePairedToken = ({area, token}: { area: string, token: GenericToken }) => <DraggableTokenArea
    area={area} token={token}>
    {(dragRef, canDrag, isDragging) => <PairedToken
        ref={dragRef} token={token} styles={getPairedDraggableContainerStyles(canDrag, isDragging)}/>}
</DraggableTokenArea>

export const DraggableToken = ({withPair = false, area, token}: {
    withPair?: boolean, area: AreaType, token: GenericToken
}) => withPair ? <DraggableTokenWithPair area={area} token={token}/> :
    <DraggableTokenWithoutPair area={area} token={token}/>