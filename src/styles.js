import {
  border,
  cssRule,
  extend,
  fontWeightNormal,
  inlineBlock,
  margin,
  padding,
  rem,
  stylesheet,
} from './typestyle-exports'
import { color, ColorHelper, viewHeight, viewWidth } from 'csx'
import { fillParent, height, width } from 'csstips'
import { isString } from 'ramda-adjunct'

export const ttu = { textTransform: 'uppercase' }
export const ttc = { textTransform: 'capitalize' }
export const ttl = { textTransform: 'lowercase' }
export const ttn = { textTransform: 'none' }
export const strike = { textDecoration: 'line-through' }
export const tc = { textAlign: 'center' }
export const tl = { textAlign: 'left' }
export const tr = { textAlign: 'right' }
export const tj = { textAlign: 'justify' }

export const pointer = { cursor: 'pointer' }
export const cText = { cursor: 'text' }

export const shadow = { boxShadow: '0 2px 4px 0 rgba(0,0,0,.1)' }
export const shadow1 = { boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }
export const shadow2 = { boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }
export const shadow3 = { boxShadow: '0 8px 16px rgba(0,0,0,0.15)' }
export const shadowN = { boxShadow: 'none' }

export const darkGray = { color: '#606f7b' }

export const pt = (u: BoxUnit) => padding(u, null, null, null)
export const pr = (u: BoxUnit) => padding(null, u, null, null)
export const pb = (u: BoxUnit) => padding(null, null, u, null)
export const pl = (u: BoxUnit) => padding(null, null, null, u)
export const ph = (u: BoxUnit) => padding(null, u, null, u)
export const pv = (u: BoxUnit) => padding(u, null, u, null)

export const br0 = { borderRadius: 0 }
export const br1 = { borderRadius: rem(0.125) }
export const br2 = { borderRadius: rem(0.25) }
export const br3 = { borderRadius: rem(0.5) }
export const br4 = { borderRadius: rem(1) }
export const brPill = { borderRadius: 9999 }
// .br-100 { border-radius: 100%; }

export const antialiased = {
  '-webkit-font-smoothing': 'antialiased',
  '-moz-osx-font-smoothing': 'grayscale',
}
export const appearanceNone = {
  '-webkit-appearance': 'none',
  '-moz-appearance': 'none',
  appearance: 'none',
}
export const sans = {
  fontFamily: `"Source Sans Pro", system-ui, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue";`,
}
export const mono = {
  fontFamily: `Menlo, Monaco, Consolas, 'Courier New', monospace`,
}
export const css = stylesheet({ antialiased })

export function bg(backgroundColor: string | ColorHelper) {
  return isString(backgroundColor)
    ? { backgroundColor }
    : { backgroundColor: backgroundColor.toHexString() }
}

export function fg(color: string | ColorHelper) {
  return isString(color) ? { color } : { color: color.toHexString() }
}

export function hover(...ext) {
  return {
    $nest: {
      '&:hover': extend(...ext),
    },
  }
}

export const dimColor = color('#000')
  .toHSLA()
  .lighten(0.5)
  .toString()
export const nearWhiteColor = color('#fff')
  .toHSLA()
  .darken(0.05)
  .toString()
export const dim2Color = color('#000')
  .toHSLA()
  .lighten(0.25)
  .toString()
export const sizeViewport100 = extend(
  height(viewHeight(100)),
  width(viewWidth(100)),
)

/**
 * Recommended Page setup
 * - Sets up the body to be full size
 * - Sets up box sizing to be border box
 **/
export function setupPage(rootSelector: string) {
  /** Use full window size for application */
  cssRule(
    'html, body',
    {
      height: '100%',
      width: '100%',
      padding: 0,
      margin: 0,
    },
    { fontSize: 16 },
    antialiased,
  )

  /** Use border box */
  cssRule('html', {
    '-moz-box-sizing': 'border-box',
    '-webkit-box-sizing': 'border-box',
    boxSizing: 'border-box',
  })
  cssRule('*,*:before,*:after', {
    boxSizing: 'inherit',
  })

  cssRule(
    'button, input, optgroup, select, textarea',
    { fontFamily: 'inherit' },
    { fontSize: '100%' },
  )

  cssRule('span, a', inlineBlock)

  /** Also root should fill parent */
  cssRule(rootSelector, fillParent)
}

export function setupGlobalStyles() {
  setupPage('#root')

  cssRule('html, body', sans, { lineHeight: rem(1.5) })
  cssRule('*, *:before, *:after', border('0 solid #dae1e7'))

  cssRule('button, input, optgroup, select, textarea', { margin: 0 })

  cssRule('button, input', br2)

  const primaryColor = color('#3490dc')

  cssRule(
    'button',
    tc,
    { lineHeight: 1.15 },
    { color: '#fff' },
    bg(primaryColor),
    padding(rem(0.5), rem(1)),
    fontWeightNormal,
    { transition: 'transform backgroundColor .15s ease-in' },
    { transform: 'perspective(500px) translateZ(0px)' },
    {
      $nest: {
        '&:active': {
          transform: 'perspective(500px) translateZ(-10px)',
        },
        '&:not([disabled])': {
          ...pointer,
          $nest: {
            '&:hover': {
              ...bg(primaryColor.darken(0.1)),
            },
          },
        },
        '&[disabled]': {
          ...bg('hsla(207, 71%, 53%, 0.36)'),
        },
      },
    },
  )

  cssRule(
    `input[type='text']`,
    { minHeight: rem(1.5) },
    shadow,
    { width: '100%' },
    padding(rem(0.5), rem(0.75)),
    { lineHeight: 1.25 },
    { borderWidth: 1 },
    appearanceNone,
  )

  cssRule(
    'a',
    { color: 'inherit' },
    { textDecoration: 'none' },
    hover({ textDecoration: 'underline' }),
  )

  cssRule('h1, h2, h3, h4, h5, h6', margin(0, null, null, null))

  cssRule(
    'hr',
    { borderWidth: 1 },
    { borderStyle: 'solid' },
    border(0, 0, null, null),
  )
}
