import { filterTasks, generateTask } from '../models/Task'
import { compose as proppy, withHandlers, withProps } from 'proppy'
import { pick } from 'ramda'
import * as React from 'react'
import { attach } from 'proppy-react'

export const pickUserChanges = pick(['title', 'category', 'done'])

export const TaskCollection = proppy(
  withProps({ allTasks: [] }),
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
