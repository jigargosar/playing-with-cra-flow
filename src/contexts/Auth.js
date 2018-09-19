import * as React from 'react'
import Component from '@reach/component-component'

import { initFireApp } from '../lib/fire'
import { call, once } from 'ramda'
import { List } from 'react-powerplug'
import { adopt } from 'react-adopt'

function setInitialAuthState(app, setState) {
  const disposer = app.auth().onAuthStateChanged(() => {
    disposer()
    setState({ authStateKnown: true })
  })
}

const Disposers = adopt({ list: <List initial={[]} /> }, ({ list }) => ({
  add: fn => list.push(once(fn)),
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
          const disposer = app
            .auth()
            .onAuthStateChanged(user => setState({ user }))
          disposers.add(disposer)
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
