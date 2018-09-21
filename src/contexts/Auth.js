// import { authStateStream, signIn, signOut } from '../lib/fire'
// import { componentFromStreamWithConfig } from 'recompose/'
// import { fromESObservable } from 'kefir/dist/kefir.esm'
// import kefirConfig from 'recompose/kefirObservableConfig'
//
// export const Auth = componentFromStreamWithConfig(kefirConfig)(props$ =>
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
export const Auth = attach(AuthFactory)(({ children, ...pp }) => children(pp))
