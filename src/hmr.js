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

export function renderRoot(Comp: Function, module: Object): Promise<any> {
  if (module.hot) {
    addWindowEventListener(
      'keydown',
      e => {
        // console.log(`key`, e.key)
        if (e.key === '`') {
          toggleClearConsoleOnHMR()
        }
      },
      module,
    )
  }
  if (module.hot && shouldClearConsoleOnHMR()) {
    console.clear()
    console.log('[HMR]')
  }

  hotAcceptSelf(e => {
    throw e
  }, module)

  return new Promise((resolve, reject) => {
    nullableToMaybe(document.getElementById('root'))
      .map(el => ReactDOM.render(<Comp />, el, resolve))
      .orElse(() => reject(new Error('root not found')))
  })
}
