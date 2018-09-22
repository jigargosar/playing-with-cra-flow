import { filterTasks, generateTask } from '../models/Task'
import {
  compose as proppy,
  emit,
  onChange,
  willDestroy,
  withHandlers,
  withProps,
} from 'proppy'
import { pathOr, pick } from 'ramda'
import * as React from 'react'
import { attach } from 'proppy-react'
import { noop } from '../ramda-exports'
import { getOrCreateFirebaseApp, signIn, signOut } from '../lib/fire'

export const pickUserChanges = pick(['title', 'category', 'done'])

export const TaskCollection = proppy(
  proppy(
    withProps({
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
  ),
  withProps({ allTasks: [], unsub: noop, cref: null }),
  onChange('uid', ({ uid }) => ({
    cref: getOrCreateFirebaseApp()
      .firestore()
      .collection(`users/${uid}/tasks`),
  })),
  onChange('cref', ({ cref, unsub }, providers, cb) => {
    unsub()
    if (cref) {
      return {
        unsub: cref.onSnapshot(sn => {
          console.log(`sn`, sn)
          const allTasks = sn.docs.map(ds => ds.data())
          console.log(allTasks)
          cb({ allTasks })
        }),
      }
    }
  }),
  willDestroy(({ unsub }) => {
    unsub()
  }),
  withHandlers({
    updateTask: ({ cref }) => (changes, task) => {
      cref.doc(task.id).update(pickUserChanges(changes))
    },
  }),
  withHandlers({
    toggleDone: ({ updateTask }) => task =>
      updateTask({ done: !task.done }, task),
    add: ({ cref }) => () => {
      const task = { ...generateTask() /*, category: 'InBasket' */ }
      return cref.doc(task.id).set(task)
    },
    filterTasks: ({ allTasks }) => pred => filterTasks(pred)(allTasks),
  }),
)

const Context = React.createContext()

export const TaskCollectionProvider = attach(TaskCollection)(
  ({ children, ...otherProps }) => (
    <Context.Provider value={otherProps} children={children} />
  ),
)
export const TaskCollectionConsumer = Context.Consumer
