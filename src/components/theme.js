import { Button, css, injectGlobal } from 'reakit'

injectGlobal(css`
  body {
    font-size: 20px;
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
