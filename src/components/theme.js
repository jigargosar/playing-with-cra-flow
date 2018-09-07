import { Button, css, injectGlobal } from 'reakit'

injectGlobal(css`
  html,
  body {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: Roboto, 'Source Code Pro', Monaco, Menlo, Consolas,
      'Courier New', monospace;
  }
`)
export const theme = {
  Button: css`
    font-size: 14px;
    height: 2em;
    text-transform: uppercase;
  `,
  Group: css`
    > ${Button} {
      min-height: 2em;
      height: auto;
    }
  `,
}
