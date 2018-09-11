import { BoxUnit, padding } from 'csstips'

export { style, classes, extend, cssRaw } from 'typestyle'
export {
  flex,
  height,
  horizontal,
  horizontallySpaced,
  vertical,
  verticallySpaced,
  padding,
  scroll,
  someChildWillScroll,
  width,
  none,
  normalize,
  setupPage,
  content,
  margin,
  maxHeight,
  maxWidth,
  block,
  inlineBlock,
  inlineRoot,
  invisible,
  gridSpaced,
} from 'csstips'
export { color, params, rem, viewHeight, viewWidth } from 'csx'
export const ttu = { textTransform: 'uppercase' }

export const strike = { textDecoration: 'line-through' }
export const pt = (u: BoxUnit) => padding(u, null, null, null)
export const pr = (u: BoxUnit) => padding(null, u, null, null)
export const pb = (u: BoxUnit) => padding(null, null, u, null)
export const pl = (u: BoxUnit) => padding(null, null, null, u)
export const ph = (u: BoxUnit) => padding(null, u, null, u)
export const pv = (u: BoxUnit) => padding(u, null, u, null)
