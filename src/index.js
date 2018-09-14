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

addWindowEventListener(
  'keydown',
  e => {
    const key = e.key
    console.log(`key`, key)
    if (key === '`') {
      storageSet('clearOnHMR', !Boolean(storageGet('clearOnHMR', true)))
    }
  },
  module,
)
