import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { forceRenderStyles } from 'typestyle'

import App from './App'

forceRenderStyles()
ReactDOM.render(<App />, document.getElementById('root'), (...args) => {
  console.log('callback', ...args)
  forceRenderStyles()
})

registerServiceWorker()

// if (module.hot) {
//   module.hot.accept(console.error)
// }
