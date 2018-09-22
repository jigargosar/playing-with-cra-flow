import { filterTasks, generateTask } from '../models/Task'
import {
  compose as proppy,
  onChange,
  willDestroy,
  withHandlers,
  withProps,
} from 'proppy'
import { compose, identity, pick } from 'ramda'
import * as React from 'react'
import { attach } from 'proppy-react'
import { noop } from '../ramda-exports'
import { fromRenderProps } from 'recompose'
import { AuthConsumer } from './Auth'
import { getOrCreateFirebaseApp } from '../lib/fire'

export const pickUserChanges = pick(['title', 'category', 'done'])

export const TaskCollection = proppy(
  withProps({ allTasks: [], unsub: noop, cref: null }),
  onChange('uid', ({ uid, unsub }, providers, cb) => {
    unsub()
    const cref = uid
      ? getOrCreateFirebaseApp()
          .firestore()
          .collection(`users/${uid}/tasks`)
      : null

    return cref
      ? {
          cref,
          unsub: cref.onSnapshot(sn => {
            console.log(`sn`, sn)
            const allTasks = sn.docs.map(ds => ds.data())
            console.log(`allTasks.length`, allTasks.length)
            cb({ allTasks })
          }),
        }
      : { cref }
  }),
  willDestroy(({ unsub }) => unsub()),
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

export const TaskCollectionProvider = compose(
  fromRenderProps(AuthConsumer, identity),
  attach(TaskCollection),
)(({ children, ...otherProps }) => (
  <Context.Provider value={otherProps} children={children} />
))

export const TaskCollectionConsumer = Context.Consumer
