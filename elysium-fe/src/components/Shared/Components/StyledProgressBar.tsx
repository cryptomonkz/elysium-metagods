import styled from "styled-components";
import {ProgressBar, ProgressBarProps} from 'primereact/progressbar';
import ProgressBarBackground from "../../../assets/Images/progressBarBackground.png";
import {AbsoluteBorderRadius, Color, Spacing} from "../Constants/StylesConstants";

const ProgressBarContainer = styled.div`
    flex: 1;
    max-width: 300px;
    padding: ${Spacing.TINY};
    border: 0.5px solid ${Color.METALLIC};
    border-radius: ${AbsoluteBorderRadius.SMALL};
    background-color: ${Color.BACKGROUND_PROGRESS_BAR};
`

const StyledBar = styled(ProgressBar)`
    height: 5px;
    border-radius: ${AbsoluteBorderRadius.SMALL};
    background-color: ${Color.TRANSPARENT};

    .p-progressbar-value {
        background-image: url("${ProgressBarBackground}");
        background-position: 0 50%;
        background-size: cover;
        background-repeat: no-repeat;
        background-color: rgba(219,213,209,.61);
    }
`

const StyledProgressBar = ({...properties}: ProgressBarProps) => <ProgressBarContainer>
    <StyledBar {...properties}/>
</ProgressBarContainer>

export default StyledProgressBar