import {useSelector} from "react-redux"
import styled from "styled-components"
import {ApplicationState} from "./Shared/State/ApplicationState"
import {Color, FLEX_CENTERED_CONTAINER, FULL_SIZE_ABSOLUTE_POSITION, Z_INDEX} from "./Shared/Constants/StylesConstants";
import GenericLoader from "./Shared/Components/GenericLoader";
import {useCallback, useState} from "react";
import {ElysiumDialog} from "./Shared/Components/ElysiumDialog";
import {ThemeButton} from "./Shared/Components/StyledButton";
import {TitleWithSeparator} from "./Shared/Components/Section";
import {SeparatorType} from "./Shared/Components/Separator";
import {playBackgroundSound} from "./Shared/State/Sound/SoundService";
import {BACKGROUND_SOUND} from "./Shared/State/Sound/SoundState";

const Loader = () => {
    const [joinedWorld, setJoinedWorld] = useState(false)
    const loading = useSelector<ApplicationState, boolean>(applicationState => (
        !!applicationState?.loaderState?.dataLoading ||
        !!applicationState?.loaderState?.mapLoading ||
        !!applicationState?.loaderState?.miniMapLoading
    ))

    const onJoinWorld = useCallback(() => {
        setJoinedWorld(true)
        playBackgroundSound(BACKGROUND_SOUND.DEFAULT)
    }, [])

    return <>
        {loading && <Wrapper>
            <GenericLoader loading={loading}/>
        </Wrapper>}
        <ElysiumDialog position={"center"} visible={!loading && !joinedWorld} onHide={onJoinWorld}
                       dismissableMask={true}>
            <TitleWithSeparator title={"Welcome to Elysium MetaGods"} titleStyles={{textAlign: "center"}}
                                separatorType={SeparatorType.THEME_LARGE}/>
            <JoinContainer>
                <ThemeButton onClick={onJoinWorld}>Join World</ThemeButton>
            </JoinContainer>
        </ElysiumDialog>
    </>
}

const JoinContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
`

const Wrapper = styled.div`
    ${FULL_SIZE_ABSOLUTE_POSITION}
    background-color: ${Color.WHITE};
    z-index: ${Z_INDEX.LOADER};
`

export default Loader
