import { nullableToMaybe } from 'folktale/conversions'
import ReactDOM from 'react-dom'
import React from 'react'

export function renderRootApp(Comp: Function): Promise<any> {
  return new Promise((resolve, reject) => {
    nullableToMaybe(document.getElementById('root'))
      .map(el => ReactDOM.render(<Comp />, el, resolve))
      .orElse(() => reject(new Error('root not found')))
  })
}
