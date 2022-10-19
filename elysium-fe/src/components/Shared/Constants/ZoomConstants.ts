export const ZOOM_STEP = 0.25
export const NO_ZOOM_LEVELS = 5
export const MIN_ZOOM_LEVEL = 0
export const MAX_ZOOM_LEVEL = MIN_ZOOM_LEVEL + (NO_ZOOM_LEVELS - 1) * ZOOM_STEP
export const DEFAULT_ZOOM_LEVEL = MIN_ZOOM_LEVEL + 2 * ZOOM_STEP

export const SCALE_LIMITS = { MIN: 0.35, MAX: 1 }