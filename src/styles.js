import {
  border,
  cssRaw,
  cssRule,
  extend,
  fontWeightNormal,
  inlineBlock,
  normalize,
  padding,
  rem,
  setupPage,
  stylesheet,
} from './typestyle-exports'

export const ttu = { textTransform: 'uppercase' }
export const strike = { textDecoration: 'line-through' }
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
      ':hover': extend(...ext),
    },
  }
}

function bgHover(backgroundColor) {
  return hover(backgroundColor)
}

export function setupGlobalStyles() {
  normalize()
  setupPage('#root')

  cssRule('html,body', antialiased, sans)
  cssRule('*,*:before,*:after', border('0 solid #dae1e7'))
  cssRule(
    'button',
    { borderWidth: rem(0.5) },
    { textAlign: 'center' },
    { fontFamily: 'inherit' },
    { fontSize: '100%' },
    { lineHeight: 1.15 },
    { borderRadius: rem(0.25) },
    { cursor: 'pointer' },
    { color: '#fff' },
    bg('#3490dc'),
    bgHover('#2779bd'),
    padding(rem(0.5), rem(1)),
    fontWeightNormal,
  )
  cssRule('span', inlineBlock)

  // language=LESS
  cssRaw`
    html,
    body {
      font-size: 16px;
      //font-size: 20px;
      line-height: 1.5em;
    }

    input[type='text'] {
      font-size: 16px;
      min-height: 1.5rem;
      font-family: inherit;
    }

    form {
      margin-bottom: 1rem;
    }

    h1, h2, h3, h4, h5, h6 {
      margin-top: 0;
    }

    a {
      display: inline-block;
      color: inherit;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

  `
}
