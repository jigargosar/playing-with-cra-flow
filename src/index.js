import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { forceRenderStyles } from 'typestyle'
import { setupGlobalStyles } from './styles'

setupGlobalStyles()

ReactDOM.render(<App />, document.getElementById('root'))
forceRenderStyles()

registerServiceWorker()

if (module.hot) {
  module.hot.accept(() => {
  })
}
