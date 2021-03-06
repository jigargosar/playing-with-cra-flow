import {
  cssRule,
  inlineBlock,
  padding,
  rem,
  stylesheet,
} from './typestyle-exports'
import { ColorHelper, hsla, viewHeight, viewWidth } from 'csx'
import { BoxUnit, fillParent, fontWeightNormal, height, width } from 'csstips'
import { mergeAll } from 'ramda'
import { extend } from 'typestyle/'
import { isString } from './ramda-exports'

export const relative = { position: 'relative' }
export const absolute = { position: 'absolute' }
export const sticky = { position: 'sticky' }
export const fixed = { position: 'fixed' }

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
export const cursorText = { cursor: 'text' }

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

export function bg(backgroundColor: string | ColorHelper) {
  return isString(backgroundColor)
    ? { backgroundColor }
    : { backgroundColor: backgroundColor.toString() }
}

export function fg(color: string | ColorHelper) {
  return isString(color) ? { color } : { color: color.toString() }
}

export const hover = (...ext) => ({ $nest: { '&:hover': extend(...ext) } })

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
  cssRule('*,*:before,*:after', { boxSizing: 'inherit' })

  cssRule(
    'button, input, optgroup, select, textarea',
    { fontFamily: 'inherit' },
    { fontSize: '100%' },
  )

  cssRule('span, a', inlineBlock)

  /** Also root should fill parent */
  cssRule(rootSelector, fillParent)
}

export const p3 = 360 / 3
export const p6 = 360 / 6
// const primaryColor = hsla(p6 * 4, 0.6, 0.6, 1)
const primaryColor = hsla(p3 * 2, 0.6, 0.6, 1)

export const sheet = stylesheet({
  antialiased,
  button: mergeAll([
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
          ...bg(primaryColor.fade(0.5)),
        },
      },
    },
  ]),
})

export function setupGlobalStyles() {
  setupPage('#root')

  cssRule('html, body', sans)
  // cssRule('html, body', { lineHeight: rem(1.5) })
  // cssRule('*, *:before, *:after', border('0 solid #dae1e7'))

  // cssRule('button, input, optgroup, select, textarea', { margin: 0 })

  // cssRule('button, input', br2)
  // cssRule(
  //   'button',
  //   mergeAll([
  //     tc,
  //     { lineHeight: 1.15 },
  //     { color: '#fff' },
  //     bg(primaryColor),
  //     padding(rem(0.5), rem(1)),
  //     fontWeightNormal,
  //     { transition: 'transform backgroundColor .15s ease-in' },
  //     { transform: 'perspective(500px) translateZ(0px)' },
  //     {
  //       $nest: {
  //         '&:active': {
  //           transform: 'perspective(500px) translateZ(-10px)',
  //         },
  //         '&:not([disabled])': {
  //           ...pointer,
  //           $nest: {
  //             '&:hover': {
  //               ...bg(primaryColor.darken(0.1)),
  //             },
  //           },
  //         },
  //         '&[disabled]': {
  //           ...bg(primaryColor.fade(0.5)),
  //         },
  //       },
  //     },
  //   ]),
  // )
  //
  // cssRule(
  //   `input[type='text']`,
  //   { minHeight: rem(1.5) },
  //   shadow,
  //   { width: '100%' },
  //   padding(rem(0.5), rem(0.75)),
  //   { lineHeight: 1.25 },
  //   { borderWidth: 1 },
  //   appearanceNone,
  // )
  //
  // cssRule(
  //   'a',
  //   { color: 'inherit' },
  //   { textDecoration: 'none' },
  //   hover({ textDecoration: 'underline' }),
  // )
  //
  // cssRule('h1, h2, h3, h4, h5, h6', margin(0, null, null, null))
  //
  // cssRule(
  //   'hr',
  //   { borderWidth: 1 },
  //   { borderStyle: 'solid' },
  //   border(0, 0, null, null),
  // )
}

export const fgHoverDarken = fgColor =>
  extend(fg(fgColor), hover(fg(fgColor.darken(0.2))))
export const appearOnParentHoverClass = 'appearOnParentHover'
export const hasHiddenChildren = {
  $nest: {
    [`.${appearOnParentHoverClass}`]: {
      transition: 'opacity .15s ease-in',
    },
    [`&:not(:hover) .${appearOnParentHoverClass}`]: { opacity: 0 },
  },
}
