import { rgba } from 'csx/lib'

export const black = rgba(0, 0, 0, 1)
export const white = black.invert()
export const blackA = alpha => black.fade(alpha)
export const whiteA = alpha => white.fade(alpha)
export const gray = darkenBy => white.darken(darkenBy)
