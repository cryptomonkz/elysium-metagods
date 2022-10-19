import type {CSSProperties} from 'react'
import {useDragLayer, XYCoord} from 'react-dnd'
import {getFixedPosition} from "../../Utils/StylesUtils";
import styled from 'styled-components';
import {FULL_SIZE, NOT_SELECTABLE_AREA, Z_INDEX} from "../../Constants/StylesConstants";
import {BackgroundType, Token} from "./Token";
import {PreviewItem} from "../../Models/Drag/PreviewItem";

const PreviewContainer = styled.div`
    ${getFixedPosition(0, undefined, undefined, 0)}
    ${FULL_SIZE}
    ${NOT_SELECTABLE_AREA}
    z-index: ${Z_INDEX.DRAG_PREVIEW};
`

const getTranslatePosition = (offset: XYCoord): string => `translate(${offset.x}px, ${offset.y}px)`

const getPreviewPosition = (offset: XYCoord | null): CSSProperties => !offset ? {display: 'none'} : {
    transform: getTranslatePosition(offset),
    WebkitTransform: getTranslatePosition(offset),
}

export const DraggedTokenPreview = () => {
    const { isDragging, item, offset} = useDragLayer<{isDragging: boolean, item?: PreviewItem, offset: XYCoord | null}, PreviewItem>(monitor => ({
        item: monitor.getItem(),
        isDragging: monitor.isDragging(),
        offset: monitor.getSourceClientOffset(),
    }))
    return !!isDragging && item ? <PreviewContainer>
        <div style={getPreviewPosition(offset)}>
            <Token token={item.token} backgroundType={BackgroundType.HIGHLIGHT}/>
        </div>
    </PreviewContainer> : <></>
}
