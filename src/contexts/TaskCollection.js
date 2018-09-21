// import * as React from 'react'
// import { generateTask, loadOrGenerateTasks, saveTasks } from '../models/Task'
// import { append, compose, map, pick, propEq, when } from 'ramda'
// import { defaultProps, toRenderProps, withHandlers } from 'recompose'
// import { withValue } from '../components/Value'
// import { mergeRight } from '../ramda-exports'
//
// const pickUserChanges = pick(['title', 'category', 'done'])
//
// const updateTask = tasks => (changes, { id }) =>
//   tasks.set(map(when(propEq('id', id))(mergeRight(pickUserChanges(changes)))))
//
// export const TaskCollection = toRenderProps(
//   compose(
//     defaultProps({ initial: loadOrGenerateTasks, onChange: saveTasks }),
//     withValue,
//     withHandlers({
//       update: updateTask,
//       toggleDone: tasks => task =>
//         updateTask(tasks)({ done: !task.done }, task),
//       add: tasks => () => {
//         const task = { ...generateTask(), category: 'InBasket' }
//         tasks.set(append(mergeRight(task)))
//       },
//     }),
//   ),
// )
//
// const Context = React.createContext()
//
// export const TaskCollectionProvider = ({ children }) => (
//   <TaskCollection
//     children={value => <Context.Provider value={value} children={children} />}
//   />
// )
//
// export const TaskCollectionConsumer = Context.Consumer

import { generateTask, loadOrGenerateTasks, saveTasks } from '../models/Task'
import { compose as proppy, onChange, withHandlers, withState } from 'proppy'
import { append, compose, map, pick, prop, propEq, when } from 'ramda'
import { mergeRight } from '../ramda-exports'
import * as React from 'react'
import { attach } from 'proppy-react'

const pickUserChanges = pick(['title', 'category', 'done'])

const updateTask = tasks => (changes, { id }) =>
  tasks.set(
    map(when(propEq('id', id))(mergeRight(pickUserChanges(changes))))(
      tasks.value,
    ),
  )

export const TaskCollection = proppy(
  withState('value', 'set', loadOrGenerateTasks()),
  withHandlers({ over: ({ value, set }) => fn => set(fn(value)) }),
  withHandlers({
    update: updateTask,
    toggleDone: tasks => task => updateTask(tasks)({ done: !task.done }, task),
    add: tasks => () => {
      const task = { ...generateTask(), category: 'InBasket' }
      tasks.over(append(task))
    },
  }),
  onChange(
    'value',
    compose(
      saveTasks,
      prop('value'),
    ),
  ),
)

const Context = React.createContext()

export const TaskCollectionProvider = attach(TaskCollection)(
  ({ children, ...otherProps }) => (
    <Context.Provider value={otherProps} children={children} />
  ),
)
export const TaskCollectionConsumer = Context.Consumer
