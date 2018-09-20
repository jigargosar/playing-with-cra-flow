import * as React from 'react'
import { loadOrGenerateTasks, saveTasks } from '../models/Task'
import { compose, map, pick } from 'ramda'
import { defaultProps, toRenderProps, withHandlers } from 'recompose'
import { withValue } from '../components/Value'

export const TaskCollection = toRenderProps(
  compose(
    defaultProps({ initial: loadOrGenerateTasks, onChange: saveTasks }),
    withValue,
    withHandlers({
      updateTask: ({ tasks }) => (changes, { id }) =>
        tasks.set(
          map(t => {
            return t.id === id
              ? { ...t, ...pick(['title', 'category'])(changes) }
              : t
          }),
        ),
    }),
  ),
)

// export const TaskCollection = adopt(
//   {
//     tasks: <Value initial={loadOrGenerateTasks} onChange={saveTasks} />,
//   },
//   ({ tasks }) => {
//     return {
//       value: tasks.value,
//       updateTask: (changes, { id }) =>
//         tasks.set(
//           map(t => {
//             return t.id === id
//               ? { ...t, ...pick(['title', 'category'])(changes) }
//               : t
//           }),
//         ),
//     }
//   },
// )

const Context = React.createContext()

export const TaskCollectionProvider = ({ children }) => (
  <TaskCollection
    children={value => <Context.Provider value={value} children={children} />}
  />
)

export const TaskCollectionConsumer = Context.Consumer
