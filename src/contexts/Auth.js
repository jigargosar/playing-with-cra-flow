import * as React from 'react'

import { authStateStream, signIn, signOut } from '../lib/fire'
import { __, ifElse, lensProp, objOf, over } from 'ramda'
import { p } from '../promise'
import { isFunction } from '../ramda-exports'
import { componentFromStreamWithConfig } from 'recompose/'
import { fromESObservable } from 'kefir/dist/kefir.esm'
import kefirConfig from 'recompose/kefirObservableConfig'

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

export const Auth = componentFromStreamWithConfig(kefirConfig)(props$ =>
  fromESObservable(props$).combine(
    authStateStream(),
    ({ children }, authState) =>
      children({
        authState,
        match: matcher => matcher[authState.status](authState.user),
        signOut,
        signIn,
      }),
  ),
)
