// @flow

import { addWindowEventListener } from './disposables'
import { storageGet, storageSet } from './components/StorageSet'

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

const clearConsoleOnHMRKey = 'clearConsoleOnHMR'
export const shouldClearConsoleOnHMR = () =>
  storageGet(clearConsoleOnHMRKey, true)

export function toggleClearConsoleOnHMR() {
  storageSet(clearConsoleOnHMRKey, !Boolean(shouldClearConsoleOnHMR()))
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
