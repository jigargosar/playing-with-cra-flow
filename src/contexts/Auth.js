import { getOrCreateFirebaseApp, signIn, signOut } from '../lib/fire'
import { compose as proppy, emit, withHandlers, withProps } from 'proppy'
import { attach } from 'proppy-react'
import * as React from 'react'
import { pathOr } from 'ramda'

export const AuthFactory = proppy(
  withProps({
    status: 'unknown',
    user: null,
    uid: null,
    signIn,
    signOut,
  }),
  emit(cb =>
    getOrCreateFirebaseApp()
      .auth()
      .onAuthStateChanged(user => {
        cb({
          status: user ? 'signedIn' : 'signedOut',
          user,
          uid: pathOr(null, ['uid'])(user),
        })
      }),
  ),
  withHandlers({
    match: ({ status, user }) => matcher => matcher[status](user),
  }),
)

export const attachContext = factory => {
  const { Provider, Consumer } = React.createContext()
  return {
    Consumer,
    Provider: attach(factory)(({ children, ...otherProps }) => (
      <Provider value={otherProps} children={children} />
    )),
  }
}

export const { Provider: AuthProvider, Consumer: AuthConsumer } = attachContext(
  AuthFactory,
)
