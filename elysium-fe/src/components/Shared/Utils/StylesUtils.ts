const getPositionIfNotUndefined = (property: string, position?: string | number): string => position !== undefined ? `${property}: ${position}` : ''

export const getPosition = (top?: string | number, right?: string | number, bottom?: string | number, left?: string | number): string => `
    ${getPositionIfNotUndefined('top', top)};
    ${getPositionIfNotUndefined('right', right)};
    ${getPositionIfNotUndefined('bottom', bottom)};
    ${getPositionIfNotUndefined('left', left)};
`

export const getAbsolutePosition = (top?: string | number, right?: string | number, bottom?: string | number, left?: string | number): string => `
    position: absolute;
    ${getPosition(top, right, bottom, left)}
`

export const getFixedPosition = (top?: string | number, right?: string | number, bottom?: string | number, left?: string | number): string => `
    position: fixed;
    ${getPosition(top, right, bottom, left)}
`