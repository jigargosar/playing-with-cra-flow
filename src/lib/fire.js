import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { fromESObservable } from 'kefir'
import { Observable } from 'rxjs'
import { compose, isNil, map, path } from 'ramda'
import { nullableToMaybe } from 'folktale/conversions'

const fire = firebase

export function getOrCreateFirebaseApp() {
  const config = {
    apiKey: 'AIzaSyAve3E-llOy2_ly87mJMSvcWDG6Uqyq8PA',
    authDomain: 'not-now-142808.firebaseapp.com',
    databaseURL: 'https://not-now-142808.firebaseio.com',
    projectId: 'not-now-142808',
    storageBucket: 'not-now-142808.appspot.com',
    messagingSenderId: '476064436883',
  }

  function createApp() {
    const app = fire.initializeApp(config)
    const firestore = firebase.firestore()
    firestore.settings({
      timestampsInSnapshots: true,
    })
    return app
  }

  return fire.apps[0] || createApp()
}

export const authStateStream = (app = getOrCreateFirebaseApp()) =>
  fromESObservable(Observable.create(o => app.auth().onAuthStateChanged(o)))
    .map(user => ({ user }))
    .toProperty(() => ({ status: 'unknown', user: null }))
    .map(({ user }) => ({ status: user ? 'signedIn' : 'signedOut', user }))

export const firestoreUserCollectionStream = (
  name,
  app = getOrCreateFirebaseApp(),
) => {
  return authStateStream(app)
    .map(
      compose(
        mb => mb.getOrElse(null),
        map(uid =>
          compose(
            fromESObservable,
            cRef => Observable.create(observer => cRef.onSnapshot(observer)),
            (uid, name) => app.firestore().collection(`/users/${uid}/${name}`),
          )(uid, name),
        ),
        nullableToMaybe,
        path(['user', 'uid']),
      ),
    )
    .skipWhile(isNil)
    .flatMap()
}

firestoreUserCollectionStream('todos').filterErrors(e => {
  console.log(`e`, e)
  return true
})

export const signOut = () =>
  getOrCreateFirebaseApp()
    .auth()
    .signOut()

export const signIn = () => {
  const auth = getOrCreateFirebaseApp().auth()
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
  googleAuthProvider.setCustomParameters({
    prompt: 'select_account',
  })
  return auth.signInWithRedirect(googleAuthProvider)
}
