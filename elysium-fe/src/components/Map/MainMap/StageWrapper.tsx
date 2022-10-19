import {forwardRef, MutableRefObject, ReactNode, useCallback, useState} from "react";
import styled from "styled-components";
import {SCROLL_END_TIMEOUT} from "../../Shared/Constants/TimeoutConstants";
import {signalDragging} from "../../Shared/State/Drag/DragService";
import {getCoordinatesWithLimits, getOffset} from "../../Shared/Utils/CoordinateUtils";
import {getMouseEventPositions, getTouchEventPositions} from "../../Shared/Utils/EventUtils";
import {
    setMainStageScaledPositionAndNotify,
    signalClientScaledPositionChange
} from "../../Shared/Utils/MainMapUtils";
import {
    adaptOffsetToScrollSpeed,
    buildScrollableScaledLimitsForStage,
    getOffsetFromStartScroll,
    getScrollState,
    scrollElement,
    scrollToCenter
} from "../../Shared/Utils/ScrollUtils";
import {getStageAbsoluteScaledPosition, getStageRelativeScaledPosition} from "../../Shared/Utils/StageUtils";
import {Sizes} from "../../Shared/Models/Map/Sizes";
import {FULL_SIZE, Z_INDEX} from "../../Shared/Constants/StylesConstants";

interface WrapperState {
    dragging: boolean,
    startCoordinates?: Sizes,
    startScrollPositions?: Sizes,
    offsetLimits?: { MIN: Sizes, MAX: Sizes }
}

const StageWrapper = forwardRef(({ children, stage }: { children: ReactNode, stage: MutableRefObject<any> }, stageContainer) => {

    const [dragState, setDragState] = useState<WrapperState>({
        dragging: false,
        startCoordinates: undefined,
        startScrollPositions: undefined,
        offsetLimits: undefined
    })

    const computeOffsetLimits = useCallback(() => {
        const stagePosition = getStageAbsoluteScaledPosition(stage)
        const stageScrollableLimits = buildScrollableScaledLimitsForStage(stage)
        const maxOffset = getOffset(stageScrollableLimits.topLeft, stagePosition)
        const minOffset = getOffset(stageScrollableLimits.bottomRight, stagePosition)
        return { MIN: minOffset, MAX: maxOffset }
    }, [stage])

    const isDragging = useCallback(() => !!dragState?.dragging, [dragState])

    const getStartCoordinates = useCallback(() => dragState?.startCoordinates, [dragState])

    const getStartScroll = useCallback(() => dragState?.startScrollPositions, [dragState])

    const getOffsetLimits = useCallback(() => dragState?.offsetLimits, [dragState])

    const startDragging = useCallback((startCoordinates: Sizes) => {
        setDragState({
            dragging: true,
            startCoordinates,
            startScrollPositions: getScrollState(stageContainer),
            offsetLimits: computeOffsetLimits()
        })
    }, [stageContainer, computeOffsetLimits])

    const moveMap = useCallback((moveCoordinatesExtractor: () => Sizes) => {
        if (isDragging()) {
            signalDragging(true)
            const offset = adaptOffsetToScrollSpeed(stage, getOffset(getStartCoordinates(), moveCoordinatesExtractor()))
            const offsetWithinLimits = getCoordinatesWithLimits(offset, getOffsetLimits()?.MIN, getOffsetLimits()?.MAX)
            scrollElement(stageContainer, getOffset(offsetWithinLimits, getStartScroll()))
            signalClientScaledPositionChange(stage, getOffset(offsetWithinLimits, getStageAbsoluteScaledPosition(stage)))
        }
    }, [stage, stageContainer, isDragging, getStartCoordinates, getStartScroll, getOffsetLimits])

    const stopDragging = useCallback(() => {
        if (isDragging()) {
            const offset = getOffsetFromStartScroll(stageContainer, getStartScroll())
            setTimeout(() => {
                scrollToCenter(stageContainer)
                setMainStageScaledPositionAndNotify(stage, getOffset(offset, getStageRelativeScaledPosition(stage)))
                setTimeout(() => signalDragging(false))
            }, SCROLL_END_TIMEOUT)
            setDragState({ dragging: false, startCoordinates: undefined, startScrollPositions: undefined })
        }
    }, [stage, stageContainer, isDragging, getStartScroll])

    const handleMouseDown = useCallback((mouseEvent: any) => startDragging(getMouseEventPositions(mouseEvent)), [startDragging])

    const handleTouchStart = useCallback((mouseEvent: any) => startDragging(getTouchEventPositions(mouseEvent)), [startDragging])

    const handleMouseMove = useCallback((mouseEvent: any) => moveMap(() => getMouseEventPositions(mouseEvent)), [moveMap])

    const handleTouchMove = useCallback((mouseEvent: any) => moveMap(() => getTouchEventPositions(mouseEvent)), [moveMap])

    const handleMouseUp = useCallback(() => stopDragging(), [stopDragging])

    return <StageContainer ref={stageContainer as MutableRefObject<any>}
                           onMouseDown={handleMouseDown}
                           onTouchStart={handleTouchStart}
                           onMouseMove={handleMouseMove}
                           onTouchMove={handleTouchMove}
                           onMouseUp={handleMouseUp}
                           onTouchEnd={handleMouseUp}
                           onMouseLeave={handleMouseUp}>
        {children}
    </StageContainer>
})

const StageContainer = styled.div`
    ${FULL_SIZE}
    overflow: hidden;
    z-index: ${Z_INDEX.MAP};
`

export default StageWrapper