import styled from "styled-components";
import {DEFAULT_BUTTON_SIZE, FLEX_CENTERED_CONTAINER} from "../Constants/StylesConstants";
import {useState} from "react";
import {CancelButton, ThemeButton} from "./StyledButton";
import {ElysiumNumberInput} from "./ElysiumInput";

const GodsInputContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
`

const BackButton = styled(CancelButton)`
    ${DEFAULT_BUTTON_SIZE}
`

const ConfirmButton = styled(ThemeButton)`
    ${DEFAULT_BUTTON_SIZE}
`

const GodsInput = ({inputDisabled, confirmAction, cancelAction, placeholder, additionalProperties = {}}: {
    inputDisabled: boolean, confirmAction: (amount: number) => void,
    cancelAction: () => void, placeholder?: string, additionalProperties?: any
}) => {
    const [godsValue, setGodsValue] = useState<number | null>(null)
    return <GodsInputContainer>
        <BackButton icon="pi pi-times" disabled={inputDisabled} onClick={cancelAction}/>
        <ElysiumNumberInput
            value={godsValue} disabled={inputDisabled} placeholder={placeholder}
            onValueChange={(e) => setGodsValue(e.value)} mode="decimal" {...additionalProperties}/>
        <ConfirmButton icon="pi pi-check" disabled={inputDisabled}
                       onClick={() => godsValue && confirmAction(godsValue)}/>
    </GodsInputContainer>
}

export default GodsInput