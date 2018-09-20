import * as React from 'react'
import Component from '@reach/component-component'

import { initFireApp } from '../lib/fire'
import { call, once } from 'ramda'
import { List } from 'react-powerplug'
import { adopt } from 'react-adopt'
import { p } from '../promise'

export class Value extends React.Component {
  state = this.props.value || null
  set = value => {
    return p((resolve, reject) => {
      try {
        this.setState(value, () => resolve(this.state.value))
      } catch (e) {
        reject(e)
      }
    })
  }

  render() {
    return this.props.children({ value: this.state.value, set: this.set })
  }
}

function setInitialAuthState(app, setState) {
  const disposer = app.auth().onAuthStateChanged(() => {
    disposer()
    setState({ authStateKnown: true })
  })
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

const AuthStore = adopt({
  disposers: <Disposers />,
  fire: ({ disposers, render }) => {
    const app = initFireApp()
    return (
      <Component
        children={render}
        initialState={{
          authStateKnown: false,
        }}
        didMount={({ state, setState }) => {
          console.log(`state`, state)
          setInitialAuthState(app, setState)
          disposers.add(
            app.auth().onAuthStateChanged(user => setState({ user })),
          )
        }}
        didUpdate={({ state }) => {
          console.log(`state`, state)
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
