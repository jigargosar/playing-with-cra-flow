// @flow
import 'normalize.css'
import '@reach/dialog/styles.css'
import { setupGlobalStyles } from './styles'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import { renderRoot } from './hmr'
import { addWindowEventListener } from './disposables'
import { toggleClearConsoleOnHMR } from './clearConsoleOnHMR'

setupGlobalStyles()

const promise = renderRoot(App, module)
promise.catch(console.error)

registerServiceWorker()

addWindowEventListener(
  'keydown',
  e => {
    // console.log(`key`, e.key)
    if (e.key === '`') {
      toggleClearConsoleOnHMR()
    }
  },
  module,
)
