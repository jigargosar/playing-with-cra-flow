import * as React from 'react'
import { adopt } from 'react-adopt'
import { Value } from '../components/Value'
import { loadOrGenerateTasks, saveTasks } from '../models/Task'
import { map, pick } from 'ramda'

export const TaskCollection = adopt(
  {
    tasks: <Value initial={loadOrGenerateTasks} onChange={saveTasks} />,
  },
  ({ tasks }) => ({
    value: tasks.value,
    updateTask: (changes, { id }) =>
      tasks.set(
        map(t => {
          return t.id === id
            ? { ...t, ...pick(['title', 'category'])(changes) }
            : t
        }),
      ),
  }),
)

const Context = React.createContext()

export const TaskCollectionProvider = ({ children }) => (
  <TaskCollection
    children={value => <Context.Provider value={value} children={children} />}
  />
)

export const TaskCollectionConsumer = Context.Consumer
