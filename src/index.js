import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import '@reach/dialog/styles.css'
import App from './App'
import { setupGlobalStyles } from './styles'
import { forceRenderStyles } from './typestyle-exports'

setupGlobalStyles()
ReactDOM.render(<App />, document.getElementById('root'), (...args) => {
  console.clear()
  console.log('Render Complete', ...args)
  forceRenderStyles()
})

registerServiceWorker()

if (module.hot) {
  module.hot.accept(console.error)
}
