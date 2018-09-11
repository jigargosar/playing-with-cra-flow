import { BoxUnit, normalize, padding, setupPage } from 'csstips'
import { cssRaw, cssRule, stylesheet } from 'typestyle'

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

export function setupGlobalStyles() {
  normalize()
  setupPage('#root')

  cssRule('html,body', antialiased, sans)

  // language=LESS
  cssRaw`
    *, :after, :before {
      border: 0 solid #dae1e7;
    }

    html,
    body {
      margin: 0;
      padding: 0;
      font-size: 16px;
      //font-size: 20px;
      line-height: 1.5em;
    }

    button {
      //font-size: 12px;
      //min-width: 3rem;
      //min-height: 1.5rem;
      text-align: center;
      font-family: inherit;
      //text-transform: uppercase;
      font-weight: 700;
      //background: transparent;
      background-color: #3490dc;
      color: #fff;
      padding: 0.5rem 1rem;
      border-radius: .25rem;
      cursor: pointer;
      font-size: 100%;
      line-height: 1.15;
    }

    button:hover {
      background-color: #2779bd;
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

    span {
      display: inline-block;
    }
  `
}
