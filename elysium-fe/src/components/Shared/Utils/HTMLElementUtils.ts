import { Sizes } from "../Models/Map/Sizes"

export const getScreenSize = (): Sizes => new Sizes(window.innerWidth, window.innerHeight)

export const getImageSize = (image?: HTMLImageElement): Sizes => new Sizes(image?.width, image?.height)

export const getElementSize = (element: any): Sizes => new Sizes(element?.current?.clientWidth || 0, element?.current?.clientHeight || 0)

export const getElementScrollableSize = (element: any): Sizes => new Sizes(element?.current?.scrollWidth || 0, element?.current?.scrollHeight || 0)