import {ProgressBar} from 'primereact/progressbar'
import styled from "styled-components"
import {AbsoluteBorderRadius, Color, FLEX_CENTERED_CONTAINER, FULL_SIZE} from "../Constants/StylesConstants";
import {device} from "../Constants/MediaQueries";
import {Logo} from "./Logo";

const GenericLoader = ({loading}: { loading: boolean }) => {
    return <>{loading && <GenericLoaderWrapper>
        <Logo/>
        <Progress color='lightgray' mode="indeterminate"/>
    </GenericLoaderWrapper>
    }</>
}

const Progress = styled(ProgressBar)`
    width: 150px;
    height: 5px;
    border-radius: ${AbsoluteBorderRadius.SMALL};
    background-color: ${Color.DARK_GREY};
  
    @media ${device.tablet} { 
        width: 250px;
    }
`

const GenericLoaderWrapper = styled.div`
    ${FULL_SIZE}
    ${FLEX_CENTERED_CONTAINER}
    flex-direction: column;
`

export default GenericLoader
