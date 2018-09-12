import * as React from 'react'
import * as ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { forceRenderStyles } from 'typestyle'
import { setupGlobalStyles } from './styles'

function render() {
  setupGlobalStyles()
  const App = require('./App').default
  ReactDOM.render(<App />, document.getElementById('root'))
  forceRenderStyles()
}

render()

registerServiceWorker()

if (module.hot) {
  module.hot.accept(render)
}
