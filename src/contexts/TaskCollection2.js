import { generateTask, loadOrGenerateTasks, saveTasks } from '../models/Task'
import { compose, onChange, withHandlers, withState } from 'proppy'
import { append, map, pick, propEq, when } from 'ramda'
import { mergeRight } from '../ramda-exports'
import * as React from 'react'
import { attach } from 'proppy-react'

const pickUserChanges = pick(['title', 'category', 'done'])

const updateTask = tasks => (changes, { id }) =>
  tasks.set(map(when(propEq('id', id))(mergeRight(pickUserChanges(changes)))))

export const TaskCollection = compose(
  withState('value', 'set', loadOrGenerateTasks()),
  withHandlers({
    update: updateTask,
    toggleDone: tasks => task => updateTask(tasks)({ done: !task.done }, task),
    add: tasks => () => {
      const task = { ...generateTask(), category: 'InBasket' }
      tasks.set(append(mergeRight(task)))
    },
  }),
  onChange('value', saveTasks),
)

const Context = React.createContext()

export const TaskCollectionProvider = attach(TaskCollection)(
  ({ children, ...otherProps }) => (
    <Context.Provider value={otherProps} children={children} />
  ),
)
export const TaskCollectionConsumer = Context.Consumer
