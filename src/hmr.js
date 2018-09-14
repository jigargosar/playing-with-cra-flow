// @flow

import ReactDOM from 'react-dom'
import React from 'react'
import { nullableToMaybe } from 'folktale/conversions'
import {
  shouldClearConsoleOnHMR,
  toggleClearConsoleOnHMR,
} from './clearConsoleOnHMR'
import { addWindowEventListener } from './disposables'

export const hotDispose = (disposer: Function, module: Object) => {
  if (module.hot) {
    module.hot.dispose(disposer)
  }
}
export const hotAcceptSelf = (onError: Function, module: Object) => {
  if (module.hot) {
    module.hot.accept(onError)
  }
}

function checkAndClearConsole() {
  if (shouldClearConsoleOnHMR()) {
    console.clear()
  }
  console.log('[HMR] ClearConsole=', shouldClearConsoleOnHMR())
}

function hotSetupEntry(module) {
  if (module.hot) {
    addWindowEventListener(
      'keydown',
      e => {
        if (e.key === '`') {
          toggleClearConsoleOnHMR()
          checkAndClearConsole()
        }
      },
      module,
    )
    checkAndClearConsole()
  }

  hotAcceptSelf(e => {
    throw e
  }, module)
}

function renderRootApp(Comp) {
  return new Promise((resolve, reject) => {
    nullableToMaybe(document.getElementById('root'))
      .map(el => ReactDOM.render(<Comp />, el, resolve))
      .orElse(() => reject(new Error('root not found')))
  })
}

export function renderRoot(Comp: Function, module: Object): Promise<any> {
  hotSetupEntry(module)

  return renderRootApp(Comp)
}
