export const DEVICE_SIZE = {
    mobileS: 320,
    mobileM: 375,
    mobileL: 425,
    tablet: 768,
    laptop: 1024,
    laptopL: 1440,
    desktop: 2560,
}

const DEVICE_SIZE_IN_PIXELS = {
    mobileS: `${DEVICE_SIZE.mobileS}px`,
    mobileM: `${DEVICE_SIZE.mobileM}px`,
    mobileL: `${DEVICE_SIZE.mobileL}px`,
    tablet: `${DEVICE_SIZE.tablet}px`,
    laptop: `${DEVICE_SIZE.laptop}px`,
    laptopL: `${DEVICE_SIZE.laptopL}px`,
    desktop: `${DEVICE_SIZE.desktop}px`
}

export const device = {
    mobileS: `(min-width: ${DEVICE_SIZE_IN_PIXELS.mobileS})`,
    mobileM: `(min-width: ${DEVICE_SIZE_IN_PIXELS.mobileM})`,
    mobileL: `(min-width: ${DEVICE_SIZE_IN_PIXELS.mobileL})`,
    tablet: `(min-width: ${DEVICE_SIZE_IN_PIXELS.tablet})`,
    laptop: `(min-width: ${DEVICE_SIZE_IN_PIXELS.laptop})`,
    laptopL: `(min-width: ${DEVICE_SIZE_IN_PIXELS.laptopL})`,
    desktop: `(min-width: ${DEVICE_SIZE_IN_PIXELS.desktop})`,
};