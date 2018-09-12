import { AppContainer, setConfig } from 'react-hot-loader'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { forceRenderStyles } from 'typestyle'
import { setupGlobalStyles } from './styles'

setConfig({ logLevel: 'debug' })

function render() {
  setupGlobalStyles()
  const App = require('./App').default
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root'),
  )
  forceRenderStyles()
}

render()

registerServiceWorker()

if (module.hot) {
  module.hot.accept(render)
}
