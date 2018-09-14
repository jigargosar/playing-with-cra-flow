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
import { hotAcceptSelf, hotDispose } from './hmr'

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

window.addEventListener('keydown', keyDownHandler)

function keyDownHandler(e) {
  console.log(`e`, e)
}

hotDispose(() => {
  window.removeEventListener('keydown', keyDownHandler)
}, module)

hotAcceptSelf(e => {
  console.log(`module.hot.accept`, e)
  throw e
}, module)
