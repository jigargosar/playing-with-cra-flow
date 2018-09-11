import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import { injectGlobal } from 'react-emotion'

// normalize()
// setupPage('#root')

injectGlobal`
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
  h1,h2,h3,h4,h5,h6{
    margin-top: 0;
  }
  
  a{
    display: inline-block;
    color: inherit;
    text-decoration: none;
  }
  
  a:hover{
    text-decoration: underline;
  }
`

function render() {
  ReactDOM.render(<App />, document.getElementById('root'))
}

try {
  render()
  registerServiceWorker()

  if (module.hot) {
    module.hot.accept()
  }
} catch (e) {
  console.log(e)
}
