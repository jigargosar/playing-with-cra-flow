import { getOrCreateFirebaseApp, signIn, signOut } from '../lib/fire'
import {
  compose as proppy,
  emit,
  onChange,
  withHandlers,
  withProps,
} from 'proppy'
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
  onChange('user', ({ user }) => ({ uid: user ? user.uid : null })),
  withHandlers({
    match: ({ status, user }) => matcher => matcher[status](user),
  }),
)

const { Provider, Consumer } = React.createContext()

export const AuthProvider = attach(AuthFactory)(
  ({ children, ...otherProps }) => (
    <Provider value={otherProps} children={children} />
  ),
)

export const AuthConsumer = Consumer
