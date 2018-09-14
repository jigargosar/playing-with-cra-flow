// @flow
import 'normalize.css'
import '@reach/dialog/styles.css'
import { setupGlobalStyles } from './styles'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import { hotAcceptSelf, renderRoot } from './hmr'
import { addWindowEventListener } from './disposables'

setupGlobalStyles()

renderRoot(App, module).catch(console.error)

registerServiceWorker()

addWindowEventListener(
  'keydown',
  e => {
    console.log(`e`, e)
  },
  module,
)

hotAcceptSelf(e => {
  console.log(`module.hot.accept`, e)
  throw e
}, module)
