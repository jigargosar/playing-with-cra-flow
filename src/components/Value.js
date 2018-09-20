import * as React from 'react'
import { p } from '../promise'
import { __, ifElse, lensProp, objOf, over } from 'ramda'
import { isFunction } from 'ramda-adjunct/'

export class Value extends React.Component {
  set = value => {
    return p((resolve, reject) => {
      try {
        const newState = ifElse(
          isFunction,
          over(lensProp('value'), __),
          objOf('value'),
        )(value)
        this.setState(newState, () => resolve(this.state))
      } catch (e) {
        reject(e)
      }
    })
  }

  state = { value: this.props.value, set: this.set }

  render() {
    return this.props.children(this.state)
  }
}
