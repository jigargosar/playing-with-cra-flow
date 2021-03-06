import { getOrCreateFirebaseApp, signIn, signOut } from '../lib/fire'
import { emit, withHandlers } from 'proppy'
import { pathOr } from 'ramda'
import { initialProps, properContext } from '../lib/proper'

export const { Provider: AuthProvider, Consumer: AuthConsumer } = properContext(
  initialProps({
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
