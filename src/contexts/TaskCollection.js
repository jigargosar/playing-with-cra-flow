import { generateTask, loadOrGenerateTasks, saveTasks } from '../models/Task'
import {
  compose as proppy,
  map as mapProps,
  onChange,
  withHandlers,
  withState,
} from 'proppy'
import { append, map, pick, propEq, tap, when } from 'ramda'
import { mergeRight } from '../ramda-exports'
import * as React from 'react'
import { attach } from 'proppy-react'

const pickUserChanges = pick(['title', 'category', 'done'])

export const TaskCollection = proppy(
  withState('_tasks', 'setTasks', loadOrGenerateTasks()),
  withHandlers({
    updateTask: ({ _tasks, setTasks }) => (changes, { id }) =>
      setTasks(
        map(when(propEq('id', id))(mergeRight(pickUserChanges(changes))))(
          _tasks,
        ),
      ),
  }),
  withHandlers({
    toggleDone: ({ updateTask }) => task =>
      updateTask({ done: !task.done }, task),
    add: ({ setTasks, _tasks }) => () => {
      const task = { ...generateTask(), category: 'InBasket' }
      setTasks(append(task, _tasks))
    },
  }),
  onChange('_tasks', ({ _tasks }) => ({ _tasks: tap(saveTasks)(_tasks) })),
  mapProps(({ _tasks, ...other }) => ({ allTasks: _tasks, ...other })),
)

const Context = React.createContext()

export const TaskCollectionProvider = attach(TaskCollection)(
  ({ children, ...otherProps }) => (
    <Context.Provider value={otherProps} children={children} />
  ),
)
export const TaskCollectionConsumer = Context.Consumer
