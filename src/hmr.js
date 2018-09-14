// @flow

import ReactDOM from 'react-dom'
import React from 'react'
import { nullableToMaybe } from 'folktale/conversions'

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
  if (
    module.hot &&
    module.hot.data &&
    !module.hot.data.skipClearConsole
  ) {
    console.clear()
    console.log('Render Complete')
  }

  hotAcceptSelf(e => {
    console.log(`module.hot.accept`, e)
    hotDispose(data => {
      data.skipClearConsole = true
    }, module)
    throw e
  }, module)

  return new Promise((resolve, reject) => {
    nullableToMaybe(document.getElementById('root'))
      .map(el =>
        ReactDOM.render(<Comp />, el, resolve),
      )
      .orElse(() => reject(new Error('root not found')))
  })
}