// @flow

import ReactDOM from 'react-dom'
import React from 'react'

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

export function renderRoot(Comp: Function) {
  const elementById = document.getElementById('root')
  if (elementById) {
    ReactDOM.render(<Comp />, elementById, () => {
      console.clear()
      console.log('Render Complete')
    })
  } else {
    throw new Error('root not found')
  }
}
