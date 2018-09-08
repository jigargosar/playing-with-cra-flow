import { Button, css, injectGlobal } from 'reakit'

injectGlobal(css`
  html,
  body {
    margin: 0;
    padding: 0;
    font-size: 16px;
    line-height: 1.5em;
    font-family: Roboto, 'Source Code Pro', Menlo, Monaco, Consolas,
      'Courier New', monospace;
    -webkit-font-smoothing: antialiased;
  }
  button {
    font-size: 12px;
    background: none;
    min-width: 3rem;
    min-height: 1.5rem;
    text-align: center;
    font-family: inherit;
    text-transform: uppercase;
  }

  input[type='text'] {
    font-size: 16px;
    min-height: 1.5rem;
    font-family: inherit;
  }
  form {
    margin-bottom: 1rem;
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
