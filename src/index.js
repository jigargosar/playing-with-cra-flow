// @flow
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import 'bootstrap/dist/css/bootstrap-reboot.css'
import '@reach/dialog/styles.css'
import { setupGlobalStyles } from './styles'
import registerServiceWorker from './registerServiceWorker'
import { forceRenderStyles } from 'typestyle/lib'
import { hmrSetup } from './hmr'
import App from './App'
import { renderRootApp } from './react-helpers'

setupGlobalStyles()
renderRootApp(App)
  .then(forceRenderStyles)
  .catch(console.error)

registerServiceWorker()

if (process.env.NODE_ENV === 'development') {
  hmrSetup(module)
}
