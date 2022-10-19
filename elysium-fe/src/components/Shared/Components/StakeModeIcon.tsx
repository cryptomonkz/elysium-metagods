import styled from "styled-components";
import {getStakeModeIconSource, getTitleForStakedGodsMode, StakeMode} from "../Models/Token/StakeMode";
import Tooltip from '@mui/material/Tooltip';

export enum StakeModeImageSize {
    SMALL, MEDIUM, LARGE
}

const getSizeInPixels = (size: StakeModeImageSize) => {
    switch (size) {
        case StakeModeImageSize.SMALL:
            return '15px'
        case StakeModeImageSize.MEDIUM:
            return '22px'
        case StakeModeImageSize.LARGE:
            return '30px';
        default:
            throw new Error("Stake mode image size has not been defined")
    }
}

const StakeModeImage = styled.img<{ size: StakeModeImageSize }>`
    width: ${props => getSizeInPixels(props.size)};
    height: ${props => getSizeInPixels(props.size)};
`

const StakeModeIcon = ({mode, size}: { mode: StakeMode, size: StakeModeImageSize }) => <StakeModeImage
    src={getStakeModeIconSource(mode)} size={size}/>

export const StakeModeIconWithTooltip = ({mode, size}: { mode: StakeMode, size: StakeModeImageSize }) => <Tooltip
    title={getTitleForStakedGodsMode(mode)} arrow>
    <div>
        <StakeModeIcon mode={mode} size={size}/>
    </div>
</Tooltip>

export default StakeModeIcon