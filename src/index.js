// setupGlobalStyles()
// forceRenderStyles()
// @flow
import React from 'react'
import 'normalize.css'
import '@reach/dialog/styles.css'
import { setupGlobalStyles } from './styles'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import { forceRenderStyles } from 'typestyle/lib'
import { hotAcceptSelf } from './hmr'
import { addWindowEventListener } from './disposables'

setupGlobalStyles()
const elementById = document.getElementById('root')
if (elementById) {
  ReactDOM.render(<App />, elementById, (...args) => {
    console.clear()
    console.log('Render Complete', ...args)
    forceRenderStyles()
  })
} else {
  throw new Error('root not found')
}

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
