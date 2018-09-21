// @flow
import './index.css'
import App from './App'
import hydux from 'hydux'
// import withPersist from 'hydux/lib/enhancers/persist'
import withReact, { React } from 'hydux-react'
import { setupGlobalStyles } from './styles'
import { hmrSetup } from './hmr'

setupGlobalStyles()

export default withReact(document.getElementById('root'), {
  useComponent: true,
})(hydux)({
  init: () => ({
    count: 1,
  }),
  actions: {
    down: () => state => ({ count: state.count - 1 }),
    up: () => state => ({ count: state.count + 1 }),
  },
  view: (state, actions) => <App state={state} actions={actions} />,
})

// setupGlobalStyles()
// renderRootApp(App)
//   .then(forceRenderStyles)
//   .catch(console.error)
//
// registerServiceWorker()

if (process.env.NODE_ENV === 'development') {
  hmrSetup(module)
}
