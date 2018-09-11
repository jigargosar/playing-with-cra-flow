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

function bg(backgroundColor) {
  return { backgroundColor }
}

function hover(...ext) {
  return {
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
  )
  cssRule('*, *:before, *:after', border('0 solid #dae1e7'))

  cssRule(
    'button',
    // { borderWidth: rem(0.25) },
    tc,
    { fontFamily: 'inherit' },
    { fontSize: '100%' },
    { lineHeight: 1.15 },
    { borderRadius: rem(0.25) },
    pointer,
    { color: '#fff' },
    extend(bg('#3490dc'), hover(bg('#2779bd'))),
    padding(rem(0.5), rem(1)),
    fontWeightNormal,
  )
  cssRule('span,a', inlineBlock)
  cssRule(
    'a',
    { color: 'inherit' },
    { textDecoration: 'none' },
    hover({ textDecoration: 'underline' }),
  )
  cssRule(
    `input[type='text']`,
    { fontSize: '100%' },
    { fontFamily: 'inherit' },
    { minHeight: rem(1.5) },
    shadow,
    { width: '100%' },
    padding(rem(0.5), rem(0.75)),
    { lineHeight: 1.25 },
    { borderWidth: 1 },
    { borderRadius: rem(0.25) },
    appearanceNone,
  )

  cssRule('h1, h2, h3, h4, h5, h6', margin(0, null, null, null))
}
