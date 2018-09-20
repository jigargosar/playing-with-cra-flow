import { authStateStream, signIn, signOut } from '../lib/fire'
import { componentFromStreamWithConfig } from 'recompose/'
import { fromESObservable } from 'kefir/dist/kefir.esm'
import kefirConfig from 'recompose/kefirObservableConfig'

export const Auth = componentFromStreamWithConfig(kefirConfig)(props$ =>
  fromESObservable(props$).combine(
    authStateStream(),
    ({ children }, authState) =>
      children({
        authState,
        match: matcher => matcher[authState.status](authState.user),
        signOut,
        signIn,
      }),
  ),
)
