import * as React from 'react'
import Component from '@reach/component-component'

import { initFireApp } from '../lib/fire'

function setInitialAuthState(app, setState) {
  const disposer = app.auth().onAuthStateChanged(() => {
    disposer()
    setState({ authStateKnown: true })
  })
}

const AuthStore = ({ children }) => {
  const disposers = []
  return (
    <Component
      children={children}
      initialState={{
        app: initFireApp(),
        authStateKnown: false,
      }}
      didMount={({ state, setState }) => {
        console.log(`state`, state)
        const { app } = state
        setInitialAuthState(app, setState)
        const disposer = app
          .auth()
          .onAuthStateChanged(user => setState({ user }))
        disposers.push(disposer)
      }}
      didUpdate={({ state }) => {
        console.log(`state`, state)
      }}
      willUnmount={({ state: { app } }) => {
        disposers.forEach(fn => fn())
      }}
    />
  )
}

const AuthContext = React.createContext({})

export const AuthProvider = ({ children }) => (
  <AuthStore
    children={props => (
      <AuthContext.Provider value={props} children={children} />
    )}
  />
)

export const AuthConsumer = AuthContext.Consumer
