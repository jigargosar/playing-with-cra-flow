import {
  border,
  cssRule,
  extend,
  fontWeightNormal,
  inlineBlock,
  margin,
  normalize,
  padding,
  rem,
  setupPage,
  stylesheet,
} from './typestyle-exports'
import { color } from 'csx'
import dialogCSS from '@reach/dialog/styles.css'

console.log(`dialogCSS`, dialogCSS)

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

export function bg(backgroundColor) {
  return { backgroundColor }
}

export function hover(...ext) {
  return {
    transition: '.15s ease-in',
    $nest: {
      '&:hover': extend(...ext),
    },
  }
}

export function setupGlobalStyles() {

  normalize()
  setupPage('#root')

  cssRule(
    'html, body',
    antialiased,
    sans,
    { fontSize: 16 },
    { lineHeight: rem(1.5) },
    // { lineHeight: rem(1.1) },
  )
  cssRule('*, *:before, *:after', border('0 solid #dae1e7'))

  cssRule(
    'button, input, optgroup, select, textarea',
    { fontFamily: 'inherit' },
    { fontSize: '100%' },
    { margin: 0 },
  )

  cssRule(
    'button, input',
    { fontFamily: 'inherit' },
    { fontSize: '100%' },
    { margin: 0 },
    br2,
  )
  cssRule(
    'button',
    tc,
    { lineHeight: 1.15 },
    pointer,
    { color: '#fff' },
    extend(bg('#3490dc'), hover(bg('#2779bd'))),
    padding(rem(0.5), rem(1)),
    fontWeightNormal,
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
  cssRule('span,a', inlineBlock)
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
