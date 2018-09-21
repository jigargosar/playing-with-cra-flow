import { generateTask, loadOrGenerateTasks, saveTasks } from '../models/Task'
import { compose as proppy, onChange, withHandlers, withState } from 'proppy'
import { append, map, pick, propEq, tap, when } from 'ramda'
import { mergeRight } from '../ramda-exports'
import * as React from 'react'
import { attach } from 'proppy-react'

const pickUserChanges = pick(['title', 'category', 'done'])

export const TaskCollection = proppy(
  withState('value', 'set', loadOrGenerateTasks()),
  withHandlers({ over: ({ value, set }) => fn => set(fn(value)) }),
  withHandlers({
    updateTask: tasks => (changes, { id }) =>
      tasks.set(
        map(when(propEq('id', id))(mergeRight(pickUserChanges(changes))))(
          tasks.value,
        ),
      ),
  }),
  withHandlers({
    toggleDone: ({ updateTask }) => task =>
      updateTask({ done: !task.done }, task),
    add: tasks => () => {
      const task = { ...generateTask(), category: 'InBasket' }
      tasks.over(append(task))
    },
  }),
  onChange('value', ({ value }) => ({ value: tap(saveTasks)(value) })),
)

const Context = React.createContext()

export const TaskCollectionProvider = attach(TaskCollection)(
  ({ children, ...otherProps }) => (
    <Context.Provider value={otherProps} children={children} />
  ),
)
export const TaskCollectionConsumer = Context.Consumer
