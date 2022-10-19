import React from "react";
import styled from "styled-components";
import {FLEX_CENTERED_CONTAINER, Spacing} from "../../../Shared/Constants/StylesConstants";
import {ApplicationState} from "../../../Shared/State/ApplicationState";
import {useSelector} from "react-redux";
import {
    EditMode,
    getEditModeColor,
    getEditModeDisplayedName,
    getEditModeGradient
} from "../../../Shared/State/GreatHall/EditMode";
import {getEditModeFromState, signalEditMode} from "../../../Shared/State/GreatHall/GreatHallService";
import FinalizeDialog from "./FinalizeDialog";
import ClaimDialog from "./ClaimDialog";
import StyledCheckbox, {CheckboxLabel} from "../../../Shared/Components/StyledCheckbox";

const PanelWrapper = styled.div`
    margin-left: auto;
    max-width: fit-content;
`

const PanelContainer = styled.div`
    padding-bottom: ${Spacing.FIRST};
    ${FLEX_CENTERED_CONTAINER}
    justify-content: flex-end;
    flex-direction: row;
    flex-wrap: wrap;
`

const CheckboxContainer = styled.div`
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: ${Spacing.SECOND};
    margin-bottom: ${Spacing.SECOND};
`

const EditPanel = ({account}: {account: string}) => {
    const editMode = useSelector<ApplicationState, EditMode | undefined>(applicationState => (
        getEditModeFromState(applicationState)
    ))
    return <PanelWrapper>
        <PanelContainer>
            <FinalizeDialog account={account} editMode={editMode}/>
            {
                Object.values(EditMode).map((currentMode) => <CheckboxContainer
                    key={currentMode} className="field-checkbox">
                    <StyledCheckbox inputId={currentMode} name={currentMode} value={currentMode} icon={""}
                                    onChange={(event) => event.checked && signalEditMode(event.value)}
                                    checked={!!editMode && editMode === currentMode}
                                    disabled={!!editMode && editMode !== currentMode}
                                    color={getEditModeColor(currentMode)} gradient={getEditModeGradient(currentMode)}/>
                    <CheckboxLabel htmlFor={currentMode}>{getEditModeDisplayedName(EditMode[currentMode])}</CheckboxLabel>
                </CheckboxContainer>)
            }
            <ClaimDialog account={account} editMode={editMode}/>
        </PanelContainer>
    </PanelWrapper>
}

export default EditPanel