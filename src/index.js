// @flow
import 'normalize.css'
import '@reach/dialog/styles.css'
import { setupGlobalStyles } from './styles'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import { renderRoot } from './hmr'
import { forceRenderStyles } from 'typestyle/lib'

setupGlobalStyles()

renderRoot(App, module)
  .then(forceRenderStyles)
  .catch(console.error)

registerServiceWorker()
