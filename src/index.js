import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import { forceRenderStyles } from 'typestyle'

import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
forceRenderStyles()

registerServiceWorker()

// if (module.hot) {
//   module.hot.accept(console.error)
// }
