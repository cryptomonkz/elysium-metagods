import styled from "styled-components";
import {ThemeButton} from "../../../Shared/Components/StyledButton";
import {Spacing} from "../../../Shared/Constants/StylesConstants";
import {ElysiumDialog} from "../../../Shared/Components/ElysiumDialog";
import {useState} from "react";
import Volume from "./Volume/Volume";
import {TitleWithSeparator} from "../../../Shared/Components/Section";
import {SeparatorType} from "../../../Shared/Components/Separator";

const SettingContainer = styled.div`
    margin: ${Spacing.THIRD} 0;
`

const Settings = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return <>
        <ThemeButton icon={"pi pi-sliders-h"} onClick={() => setIsDialogOpen(true)}/>
        <ElysiumDialog position={"center"} dismissableMask={true}
                       visible={isDialogOpen} onHide={() => setIsDialogOpen(false)}>
            <TitleWithSeparator title={"Settings"} titleStyles={{textAlign: "center"}}
                                separatorType={SeparatorType.THEME_LARGE}/>
            <SettingContainer>
                <Volume/>
            </SettingContainer>
        </ElysiumDialog>
    </>
}

export default Settings