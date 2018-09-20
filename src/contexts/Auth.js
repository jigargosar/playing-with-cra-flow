import * as React from 'react'
import Component from '@reach/component-component'

import { initFireApp } from '../lib/fire'
import { __, ifElse, lensProp, objOf, over } from 'ramda'
import { adopt } from 'react-adopt'
import { p } from '../promise'
import { isFunction } from '../ramda-exports'
import { Observable } from 'rxjs'
import { fromESObservable } from 'kefir'

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
const authStateStream = app =>
  fromESObservable(Observable.create(o => app.auth().onAuthStateChanged(o)))
    .toProperty(() => ({ status: 'unknown', user: null }))
    .map(user => ({ status: user ? 'signedIn' : 'signedOut', user }))

const AuthStore = adopt({
  authStateKnown: <Value value={false} />,
  fire: ({ disposers, authStateKnown, render }) => {
    const app = initFireApp()
    return (
      <Component
        children={render}
        didMount={async () => {
          authStateStream(app)
            .spy()
            .observe(authStateKnown.set)
        }}
        didUpdate={() => {
          console.log(`didUpdate: authStateKnown`, authStateKnown)
        }}
        willUnmount={() => {
          console.log(`willUnmount: authStateKnown`, authStateKnown)
        }}
      />
    )
  },
})

const AuthContext = React.createContext({})

export const AuthProvider = ({ children }) => (
  <AuthStore
    children={props => (
      <AuthContext.Provider value={props} children={children} />
    )}
  />
)

export const AuthConsumer = AuthContext.Consumer
