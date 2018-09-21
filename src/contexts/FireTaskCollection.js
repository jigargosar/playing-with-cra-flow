import { filterTasks, generateTask } from '../models/Task'
import {
  compose as proppy,
  onChange,
  willDestroy,
  withHandlers,
  withProps,
} from 'proppy'
import { merge, pick } from 'ramda'
import * as React from 'react'
import { attach } from 'proppy-react'
import { AuthFactory } from './Auth'
import { noop } from '../ramda-exports'
import { getOrCreateFirebaseApp } from '../lib/fire'

export const pickUserChanges = pick(['title', 'category', 'done'])

export const TaskCollection = proppy(
  AuthFactory,
  withProps({ allTasks: [], unsub: noop, cref: null }),
  onChange('user', ({ state, user, unsub }, providers, cb) => {
    unsub()
    if (user) {
      const cref = getOrCreateFirebaseApp()
        .firestore()
        .collection(`users/${user.uid}/tasks`)
      return {
        cref,
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
      if (cref) {
        cref.doc(task.id).set(merge(task, pickUserChanges(changes)))
      }
    },
  }),
  withHandlers({
    toggleDone: ({ updateTask }) => task =>
      updateTask({ done: !task.done }, task),
    add: ({ cref }) => () => {
      if (!cref) return
      const task = { ...generateTask(), category: 'InBasket' }
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
