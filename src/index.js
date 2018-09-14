// @flow
import 'normalize.css'
import '@reach/dialog/styles.css'
import { setupGlobalStyles } from './styles'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import { renderRoot } from './hmr'

setupGlobalStyles()

const promise = renderRoot(App, module)
promise.catch(console.error)

registerServiceWorker()
