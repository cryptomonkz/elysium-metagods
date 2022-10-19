import {useTimer} from 'react-timer-hook';
import {
    AbsoluteBorderRadius,
    Color,
    FLEX_CENTERED_CONTAINER,
    FontSize,
    fontSizeToPixels,
    FULL_WIDTH,
    Spacing
} from "../Constants/StylesConstants";
import styled from "styled-components";
import {Moment} from "moment";

const TimeComponent = styled.span`
    position: relative;
    margin: ${Spacing.FIRST} 0;
    background-color: ${Color.BACKGROUND_GREY};
    border-radius: ${AbsoluteBorderRadius.TINY};
    padding: ${Spacing.FIRST} ${Spacing.SECOND};
    ${FLEX_CENTERED_CONTAINER}
    display: inline-flex;
    font-family: inherit;
    font-size: ${fontSizeToPixels(FontSize.SMALL_TO_MEDIUM)};
    
    &:after {
        content: "";
        opacity: 0.2;
        position: absolute;
        left: 0px; right: 0px;
        top: 50%; bottom: 50%;
        ${FULL_WIDTH}
        height: 2px;
        background-color: ${Color.BACKGROUND_GREY_DARKER};
    }
`

const ElysiumTimer = ({expiryDate, signalExpiry}: {
    expiryDate: Moment, signalExpiry: () => void
}) => {
    const {seconds, minutes, hours, days} = useTimer({
        expiryTimestamp: expiryDate.toDate(), onExpire: signalExpiry, autoStart: true
    });
    return <>
        <TimeComponent>
            {days}
        </TimeComponent> days, <TimeComponent>
            {hours}
        </TimeComponent> hours, <TimeComponent>
            {minutes}
        </TimeComponent> minutes and <TimeComponent>
            {seconds}
        </TimeComponent> seconds
    </>
}

export default ElysiumTimer