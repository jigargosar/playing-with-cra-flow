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

export function hotSetupEntry(module) {
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

export function renderRootApp(Comp: Function): Promise<any> {
  return new Promise((resolve, reject) => {
    nullableToMaybe(document.getElementById('root'))
      .map(el => ReactDOM.render(<Comp />, el, resolve))
      .orElse(() => reject(new Error('root not found')))
  })
}

