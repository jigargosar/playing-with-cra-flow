import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { setupGlobalStyles } from './styles'

setupGlobalStyles()

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
