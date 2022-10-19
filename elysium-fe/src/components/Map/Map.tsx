import {MutableRefObject, useRef} from 'react';
import LandSource from './LandSource';
import MainMap from './MainMap/MainMap';
import {ApplicationState} from "../Shared/State/ApplicationState";
import {useSelector} from "react-redux";
import OverMapLayer from "./OverMap/OverMapLayer";
import styled from "styled-components";
import {FULL_SIZE_ABSOLUTE_POSITION} from "../Shared/Constants/StylesConstants";

const ContentWrapper = styled.div`
    ${FULL_SIZE_ABSOLUTE_POSITION}
`

const MapContent = ({landSources}: { landSources: MutableRefObject<any> }) => {
    const mainMapContext = useRef() as MutableRefObject<any>
    const dataLoaded = useSelector<ApplicationState, boolean>(applicationState =>
        !applicationState?.loaderState?.dataLoading
    )
    return <>{dataLoaded && <ContentWrapper>
        <MainMap ref={mainMapContext} landSources={landSources}/>
        <OverMapLayer mainMapContext={mainMapContext} landSources={landSources}/>
    </ContentWrapper>}</>
}

const Map = () => {
    const landSources = useRef()
    return <>
        <LandSource ref={landSources}/>
        <MapContent landSources={landSources}/>
    </>
}

export default Map