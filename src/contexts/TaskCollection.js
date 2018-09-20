import * as React from 'react'
import { loadOrGenerateTasks, saveTasks } from '../models/Task'
import { compose, map, pick } from 'ramda'
import { defaultProps, toRenderProps, withHandlers } from 'recompose'
import { withValue } from '../components/Value'

const updateTask = tasks => (changes, { id }) =>
  tasks.set(
    map(
      t =>
        t.id === id
          ? { ...t, ...pick(['title', 'category', 'done'])(changes) }
          : t,
    ),
  )
export const TaskCollection = toRenderProps(
  compose(
    defaultProps({ initial: loadOrGenerateTasks, onChange: saveTasks }),
    withValue,
    withHandlers({
      updateTask,
      toggleDone: tasks => task =>
        updateTask(tasks)({ done: !task.done }, task),
    }),
  ),
)

const Context = React.createContext()

export const TaskCollectionProvider = ({ children }) => (
  <TaskCollection
    children={value => <Context.Provider value={value} children={children} />}
  />
)

export const TaskCollectionConsumer = Context.Consumer
