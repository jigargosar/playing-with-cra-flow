import { getOrCreateFirebaseApp, signIn, signOut } from '../lib/fire'
import { compose as proppy, emit, withHandlers, withProps } from 'proppy'
import { attach } from 'proppy-react'
import { toRenderProps } from 'recompose'

const AuthFactory = proppy(
  withProps({ status: 'unknown', user: null, signIn, signOut }),
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

const auth = AuthFactory()

auth.subscribe(props => console.log(props))

export const Auth = toRenderProps(attach(AuthFactory))
