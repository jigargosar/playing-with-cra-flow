// @flow
import 'normalize.css'
import '@reach/dialog/styles.css'
import { setupGlobalStyles } from './styles'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import { renderRoot } from './hmr'
import { addWindowEventListener } from './disposables'
import { storageGet, storageSet } from './components/StorageSet'

setupGlobalStyles()

const promise = renderRoot(App, module)
promise.catch(console.error)

registerServiceWorker()

function toggleClearConsoleOnHMR() {
  const clearOnHMRKey = 'clearConsoleOnHMR'
  storageSet(clearOnHMRKey, !Boolean(storageGet(clearOnHMRKey, true)))
  console.log(`clearConsoleOnHMR:`, storageGet(clearOnHMRKey, null))
}

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
