import { getOrCreateFirebaseApp, signIn, signOut } from '../lib/fire'
import { compose as proppy, emit, withHandlers, withProps } from 'proppy'
import { attach } from 'proppy-react'
import { toRenderProps } from 'recompose'

const initialUser = getOrCreateFirebaseApp().auth().currentUser

export const AuthFactory = proppy(
  withProps({
    status: initialUser ? 'signedIn' : 'unknown',
    user: initialUser,
    signIn,
    signOut,
  }),
  emit(cb => {
    return getOrCreateFirebaseApp()
      .auth()
      .onAuthStateChanged(user => {
        cb({ status: user ? 'signedIn' : 'signedOut', user })
      })
  }),
  withHandlers({
    match: ({ status, user }) => matcher => matcher[status](user),
  }),
)

export const Auth = toRenderProps(attach(AuthFactory))
