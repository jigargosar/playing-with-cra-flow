import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { cssRaw, cssRule, normalize, setupPage } from './typestyle'
import { antialiased, sans } from './styles'

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
    line-height: 1.5em;
  }

  button {
    //font-size: 12px;
    background: none;
    //min-width: 3rem;
    //min-height: 1.5rem;
    text-align: center;
    font-family: inherit;
    //text-transform: uppercase;
    font-weight: 700;
    background-color: #3490dc;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: .25rem;
    cursor: pointer;
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
