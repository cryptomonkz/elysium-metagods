import styled from "styled-components";
import {
    AbsoluteBorderRadius,
    BOX_SHADOW,
    Color,
    FLEX_CENTERED_CONTAINER,
    FontFamily,
    Spacing
} from "../../Constants/StylesConstants";
import {getAbsolutePosition} from "../../Utils/StylesUtils";
import {playActionSound} from "../../State/Sound/SoundService";
import {ACTION_SOUND} from "../../State/Sound/SoundState";
import {ConnectWalletError} from "../ConnectWalletError";
import {ReactElement, useCallback, useState} from "react";

const TabsContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    ${getAbsolutePosition(`-${Spacing.ALMOST_THIRD}`, undefined, undefined, Spacing.FOURTH)}
`

const TabContainer = styled.div<{ isSelected: boolean }>`
    margin: 0 ${Spacing.ALMOST_THIRD};
    border-radius: ${AbsoluteBorderRadius.TINY};
    ${BOX_SHADOW.LIGHT_BACKGROUND_SHADOW}
    font-family: ${FontFamily.HU_THE_GAME};
    color: ${props => props.isSelected ? Color.FIRST_THEME_LIGHT : Color.WHITE}
`

function Tab<T>({selectedTab, currentTab, onClick, title}: {
    selectedTab: T, currentTab: T, onClick: (tab: T) => void, title: string
}) {
    return <TabContainer isSelected={selectedTab === currentTab} onClick={() => onClick(currentTab)}>
        {title}
    </TabContainer>
}

export function TabsWithAccount<T>(
    {
        defaultTab, tabs, children
    }: {
        defaultTab: T,
        tabs: { value: T, name: string }[],
        children: (account: string, selectedTab: T) => ReactElement,
    }
) {
    const [selectedTab, setSelectedTab] = useState<T>(() => defaultTab);

    const selectTab = useCallback((tab: T) => {
        setSelectedTab(tab)
        playActionSound(ACTION_SOUND.DROP)
    }, [])

    return <ConnectWalletError>{(account) => <>
        <TabsContainer>
            {tabs.map(tab => <Tab
                key={tab.name} selectedTab={selectedTab}
                currentTab={tab.value} title={tab.name} onClick={selectTab}/>)}
        </TabsContainer>
        {children(account, selectedTab)}
    </>}</ConnectWalletError>
}