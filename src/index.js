// setupGlobalStyles()
// forceRenderStyles()
import React from 'react'
import 'normalize.css'
import '@reach/dialog/styles.css'
import { setupGlobalStyles } from './styles'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import { forceRenderStyles } from 'typestyle'

setupGlobalStyles()
ReactDOM.render(<App />, document.getElementById('root'), (...args) => {
  console.clear()
  console.log('Render Complete', ...args)
  forceRenderStyles()
})

registerServiceWorker()

if (module.hot) {
  module.hot.accept(e => {
    console.log(`module.hot.accept`, e)
    throw e
  })
}
