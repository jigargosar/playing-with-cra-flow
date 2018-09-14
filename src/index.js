// @flow
import 'normalize.css'
import '@reach/dialog/styles.css'
import { setupGlobalStyles } from './styles'
import registerServiceWorker from './registerServiceWorker'
import { forceRenderStyles } from 'typestyle/lib'
import { hotSetupEntry, renderRootApp } from './hmr'
import App from './App'

setupGlobalStyles()
renderRootApp(App)
  .then(forceRenderStyles)
  .catch(console.error)

registerServiceWorker()

if (process.env.NODE_ENV === 'development') {
  hotSetupEntry(module)
}
