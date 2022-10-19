import {useDrag} from "react-dnd";
import {CSSProperties} from "react";
import {PreviewItem} from "../../../Shared/Models/Drag/PreviewItem";
import TokenWithMode from "../Token/TokenWithMode";
import {TOKEN_HIGHLIGHT_PROPERTIES} from "../../../Shared/Components/Drag/Token";
import {EnrolledToken} from "../../../Shared/Models/Token/EnrolledToken";

const getDraggableContainerStyles = (canDrag: boolean, isDragging: boolean, isHovering: boolean): CSSProperties =>
    isDragging || (canDrag && isHovering) ? TOKEN_HIGHLIGHT_PROPERTIES : {}

export const SimpleDraggableToken = ({stakedToken, isEnrollmentDisabled}: {
    stakedToken: EnrolledToken, isEnrollmentDisabled: boolean
}) => {
    const [{canDrag, isDragging}, dragRef] = useDrag<PreviewItem, void, { canDrag: boolean, isDragging: boolean }>(() => ({
        type: stakedToken.token.type,
        item: {token: stakedToken.token},
        canDrag: () => !isEnrollmentDisabled,
        collect: (monitor) => {
            const canDrag = monitor.canDrag(), isDragging = monitor.isDragging()
            return {canDrag: canDrag && !isDragging, isDragging: isDragging }
        },
    }), [stakedToken, isEnrollmentDisabled])

    return <TokenWithMode ref={dragRef} stakedToken={stakedToken}
                          getStyles={isHovering => getDraggableContainerStyles(canDrag, isDragging, isHovering)}/>
}