import { getOrCreateFirebaseApp, signIn, signOut } from '../lib/fire'
import {
  compose as proppy,
  emit,
  onChange,
  withHandlers,
  withProps,
} from 'proppy'
import { attach } from 'proppy-react'
import { toRenderProps } from 'recompose'

export const AuthFactory = proppy(
  withProps({
    status: 'unknown',
    user: null,
    signIn,
    signOut,
  }),
  emit(cb => {
    const initialUser = getOrCreateFirebaseApp().auth().currentUser
    cb({
      status: initialUser ? 'signedIn' : 'unknown',
      user: initialUser,
    })
    return getOrCreateFirebaseApp()
      .auth()
      .onAuthStateChanged(user => {
        cb({ status: user ? 'signedIn' : 'signedOut', user })
      })
  }),
  onChange('user', ({ user }) => ({ uid: user ? user.uid : null })),
  withHandlers({
    match: ({ status, user }) => matcher => matcher[status](user),
  }),
)

export const Auth = toRenderProps(attach(AuthFactory))
