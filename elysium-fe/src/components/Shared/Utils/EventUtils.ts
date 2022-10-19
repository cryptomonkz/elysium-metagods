import { Sizes } from "../Models/Map/Sizes"

export const preventEventDefault = (event: any): void => event?.preventDefault()

export const getMouseEventPositions = (mouseEvent: any): Sizes => new Sizes(mouseEvent?.clientX, mouseEvent?.clientY)

export const getTouchEventPositions = (touchEvent: any): Sizes => new Sizes(touchEvent?.touches[0]?.clientX, touchEvent?.touches[0]?.clientY)

export const attachOnResizeEvent = (toCall: () => void): void => window.addEventListener('resize', toCall)

export const removeOnResizeEvent = (toCall: () => void): void => window.removeEventListener('resize', toCall)