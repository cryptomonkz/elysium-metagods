import {Dialog, DialogPositionType} from "primereact/dialog";
import styled from "styled-components";
import {AbsoluteBorderRadius, Color, Spacing} from "../Constants/StylesConstants";
import {ReactNode, useCallback} from "react";
import {playActionSound} from "../State/Sound/SoundService";
import {ACTION_SOUND} from "../State/Sound/SoundState";

const StyledDialog = styled(Dialog)`
    width: 50vw;
    .p-dialog-content {
        color: ${Color.WHITE};
        background: ${Color.BACKGROUND_LIGHT};
        border: 5px solid ${Color.THIRD_THEME_DARK};
        border-radius: ${AbsoluteBorderRadius.SMALL};
        padding: ${Spacing.THIRD} ${Spacing.FOURTH};
    }
`

export const ElysiumDialog = ({position, visible, dismissableMask = false, onHide, children}: {
    position: DialogPositionType, visible: boolean, dismissableMask?: boolean, onHide: () => void, children: ReactNode
}) => {
    const onHideWithSound = useCallback(() => {
        onHide()
        playActionSound(ACTION_SOUND.DENY)
    }, [onHide])

    return <StyledDialog onHide={onHideWithSound} visible={visible} position={position}
                  showHeader={false} dismissableMask={dismissableMask}
                  closable={false} draggable={false} resizable={false} modal>
        {children}
    </StyledDialog>
}