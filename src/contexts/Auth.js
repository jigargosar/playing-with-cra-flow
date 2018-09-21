import { getOrCreateFirebaseApp, signIn, signOut } from '../lib/fire'
import { compose as proppy, emit, withHandlers, withProps } from 'proppy'
import { attach } from 'proppy-react'

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
const RenderProps = ({ children, ...pp }) => children(pp)

const toRenderProps = hoc => hoc(RenderProps)

export const Auth = toRenderProps(attach(AuthFactory))
