// @flow
import './index.css'
import App from './App'
// import withPersist from 'hydux/lib/enhancers/persist'
import { React } from 'hydux-react'
import { setupGlobalStyles } from './styles'
import { hmrSetup } from './hmr'
import registerServiceWorker from './registerServiceWorker'
import { renderRootApp } from './react-helpers'
import { forceRenderStyles } from 'typestyle'

// setupGlobalStyles()
//
// export default withReact(document.getElementById('root'), {
//   useComponent: true,
// })(hydux)({
//   init: () => ({
//     count: 1,
//   }),
//   actions: {
//     down: () => state => ({ count: state.count - 1 }),
//     up: () => state => ({ count: state.count + 1 }),
//   },
//   view: (state, actions) => <App state={state} actions={actions} />,
// })
//
setupGlobalStyles()
renderRootApp(App)
  .then(forceRenderStyles)
  .catch(console.error)

registerServiceWorker()

if (process.env.NODE_ENV === 'development') {
  hmrSetup(module)
}
