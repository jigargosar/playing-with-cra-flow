import * as React from 'react'
import Component from '@reach/component-component'

import { initFireApp } from '../lib/fire'
import { __, call, ifElse, lensProp, objOf, once, over } from 'ramda'
import { List } from 'react-powerplug'
import { adopt } from 'react-adopt'
import { p } from '../promise'
import { isFunction } from '../ramda-exports'

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

const Disposers = adopt({ list: <List initial={[]} /> }, ({ list }) => ({
  add: fn => {
    const onceFn = once(fn)
    list.push(onceFn)
    return onceFn
  },
  disposeAll: () => {
    console.log('disposing')
    list.list.forEach(call)
    list.set([])
  },
}))

const fetchAuthState = app => {
  return p((resolve, reject) => {
    try {
      const disposer = app.auth().onAuthStateChanged(
        user => {
          resolve(user)
          disposer()
        },
        e => {
          reject(e)
          disposer()
        },
      )
    } catch (e) {
      reject(e)
    }
  }).finally(a => console.warn('finally', a))
}

const AuthStore = adopt({
  disposers: <Disposers />,
  authStateKnown: <Value value={false} />,
  fire: ({ disposers, authStateKnown, render }) => {
    const app = initFireApp()
    return (
      <Component
        children={render}
        didMount={async () => {
          console.log(`state`, authStateKnown)
          await fetchAuthState(app)
          authStateKnown.set(true)

          // disposers.add(
          //   app.auth().onAuthStateChanged(user => setState({ user })),
          // )
        }}
        didUpdate={() => {
          console.log(`state`, authStateKnown)
        }}
        willUnmount={() => {
          disposers.disposeAll()
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
