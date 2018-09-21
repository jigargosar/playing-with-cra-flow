import { getOrCreateFirebaseApp, signIn, signOut } from '../lib/fire'
import { compose as proppy, emit, withProps } from 'proppy'

export const Auth = proppy(
  withProps({ status: 'unknown', user: null, signIn, signOut }),
  emit(cb => {
    return getOrCreateFirebaseApp()
      .auth()
      .onAuthStateChanged(user => {
        cb({ status: user ? 'signedIn' : 'signedOut', user })
      })
  }),
)

// export const Auth2 = componentFromStreamWithConfig(kefirConfig)(props$ =>
//   fromESObservable(props$).combine(
//     authStateStream(),
//     ({ children }, authState) =>
//       children({
//         authState,
//         match: matcher => matcher[authState.status](authState.user),
//         signOut,
//         signIn,
//       }),
//   ),
// )
