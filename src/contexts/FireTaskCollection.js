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
import { mapProps, proper } from '../lib/proper'

export const TaskQuery = proper(
  withProps({ tasks: [], unsub: noop }),
  onChange('uid', ({ uid, unsub }, providers, cb) => {
    unsub()
    const cref = uid
      ? getOrCreateFirebaseApp()
          .firestore()
          .collection(`users/${uid}/tasks`)
      : null

    return cref
      ? {
          unsub: cref.where('done', '==', false).onSnapshot(sn => {
            console.debug(`task sn`, sn)
            const allTasks = sn.docs.map(ds => ds.data())
            console.log(`allTasks.length`, allTasks.length)
            cb({ allTasks })
          }),
        }
      : {}
  }),
  willDestroy(({ unsub }) => unsub()),
)

export const pickUserChanges = pick(['title', 'category', 'done'])

export const TaskCollection = proppy(
  TaskQuery,
  withProps({ allTasks: [], unsub: noop, cref: null }),
  onChange('uid', ({ uid, unsub }) => {
    unsub()
    return uid
      ? {
          cref: getOrCreateFirebaseApp()
            .firestore()
            .collection(`users/${uid}/tasks`),
        }
      : null
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
  attach(
    proper(
      TaskCollection,
      mapProps(({ children, ...value }) => ({ children, value })),
    ),
  ),
)(Context.Provider)

export const TaskCollectionConsumer = Context.Consumer
