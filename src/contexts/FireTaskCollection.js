import { filterTasks, generateTask } from '../models/Task'
import {
  compose as proppy,
  onChange,
  willDestroy,
  withHandlers,
  withProps,
} from 'proppy'
import { pick } from 'ramda'
import * as React from 'react'
import { attach } from 'proppy-react'
import { AuthFactory } from './Auth'
import { noop } from '../ramda-exports'
import { getOrCreateFirebaseApp } from '../lib/fire'

export const pickUserChanges = pick(['title', 'category', 'done'])

export const TaskCollection = proppy(
  AuthFactory,
  withProps({ allTasks: [], unsub: noop }),
  onChange('user', ({ user, unsub }) => {
    unsub()
    if (user) {
      const cref = getOrCreateFirebaseApp()
        .firestore()
        .collection(`users/${user.uid}/todos`)
      return {
        unsub: cref.onSnapshot(console.warn),
      }
    }
  }),
  willDestroy(({ unsub }) => {
    unsub()
  }),
  withHandlers({
    updateTask: () => () => {},
  }),
  withHandlers({
    toggleDone: ({ updateTask }) => task =>
      updateTask({ done: !task.done }, task),
    add: () => () => {
      const task = { ...generateTask(), category: 'InBasket' }
      return task
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
