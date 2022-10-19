import {ReactNode, useCallback, useEffect, useState} from "react";
import {getScreenSize} from "../Utils/HTMLElementUtils";
import {attachOnResizeEvent, removeOnResizeEvent} from "../Utils/EventUtils";
import {DEVICE_SIZE} from "../Constants/MediaQueries";
import HighlightableAreaMessage from "./HighlightableAreaMessage";

export const LargerScreenComponent = ({minimumSize, children}: { minimumSize: number, children: ReactNode }) => {
    const [isScreenLargeEnough, setIsScreenLargeEnough] = useState(false)
    const setIsLargeEnough = useCallback(() => {
        const screenSize = getScreenSize()
        setIsScreenLargeEnough(screenSize.x >= minimumSize)
    }, [minimumSize])
    useEffect(() => {
        setIsLargeEnough()
        attachOnResizeEvent(setIsLargeEnough)
        return () => removeOnResizeEvent(setIsLargeEnough)
    }, [setIsLargeEnough])
    return <>
        {!!isScreenLargeEnough && children}
        {!isScreenLargeEnough && <HighlightableAreaMessage>
            A larger screen is required for this page!
        </HighlightableAreaMessage>}
    </>
}

export const LargerThanMobileScreen = ({children}: { children: ReactNode }) => {
    return <LargerScreenComponent minimumSize={DEVICE_SIZE.laptop}>{children}</LargerScreenComponent>
}