import * as React from 'react'
import { adopt } from 'react-adopt'
import { Value } from 'react-powerplug'

const EditTaskContext = React.createContext({})
export const EditTaskConsumer = EditTaskContext.Consumer

const EditTaskStore = adopt(
  {
    taskId: <Value initial={null} />,
  },
  ({ taskId }) => ({
    getTaskKey: task =>
      task.id === taskId.value
        ? `editing-${task.id}`
        : `not-editing-${task.id}`,
    isEditingTask: task => task.id === taskId.value,
    setEditingTaskId: taskId.set,
  }),
)

export const EditTaskProvider = ({ children }) => (
  <EditTaskStore
    children={props => (
      <EditTaskContext.Provider value={props} children={children} />
    )}
  />
)
