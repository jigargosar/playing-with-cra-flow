// @flow
import React from 'react'
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

export function hmrSetup(module: Object) {
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
