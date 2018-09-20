import firebase from 'firebase/app'
import 'firebase/auth'

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

  return fire.apps[0] || fire.initializeApp(config)
}
