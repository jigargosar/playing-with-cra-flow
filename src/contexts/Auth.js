import * as React from 'react'
import Component from '@reach/component-component'
import firebase from 'firebase/app'

const fire = firebase
const AuthStore = ({ children }) => {
  const config = {
    apiKey: 'AIzaSyAve3E-llOy2_ly87mJMSvcWDG6Uqyq8PA',
    authDomain: 'not-now-142808.firebaseapp.com',
    databaseURL: 'https://not-now-142808.firebaseio.com',
    projectId: 'not-now-142808',
    storageBucket: 'not-now-142808.appspot.com',
    messagingSenderId: '476064436883',
  }

  return (
    <Component
      children={children}
      initialState={{
        app: fire.apps[0] || fire.initializeApp(config),
      }}
      didMount={({ setState }) => {}}
      willUnmount={({ state: { app } }) => {}}
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
