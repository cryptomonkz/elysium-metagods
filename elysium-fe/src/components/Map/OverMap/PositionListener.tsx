import { MutableRefObject } from "react"
import { useSelector } from "react-redux"
import { Sizes } from "../../Shared/Models/Map/Sizes"
import { ApplicationState } from "../../Shared/State/ApplicationState"
import { setMainStageUnscaledPositionAndNotify } from "../../Shared/Utils/MainMapUtils"

const PositionListener = ({ mainMapContext }: { mainMapContext: MutableRefObject<any> }) => {
  const position = useSelector<ApplicationState, Sizes | undefined>(applicationState => (
    applicationState?.miniMapPositionState?.position
  ))

  position && setMainStageUnscaledPositionAndNotify(mainMapContext?.current?.stage(), position)
  return <></>
}

export default PositionListener