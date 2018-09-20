import { hsla, rem, rgba } from 'csx/'
import { p3 } from './styles'

export const accentColor = rgba(255, 99, 71, 1)
export const fz = {
  sm: { fontSize: rem(0.8) },
  xs: { fontSize: rem(0.7) },
  lg: { fontSize: rem(1.5) },
}
export const lhCopy = { lineHeight: 1.5 }

export const primaryColor = hsla(p3 * 2, 0.6, 0.6, 1)
