import { style } from 'typestyle/'
import { rem } from 'csx/'
import { verticallySpaced } from 'csstips/'
import { InlineEditTask, TaskDisplayItem } from './Task'
import * as React from 'react'
import { createStringValue } from 'react-values'
import { relative } from '../styles'
import pose, { PoseGroup } from 'react-pose'
import { adopt } from 'react-adopt'
import { Value } from 'react-powerplug'

// const editTaskStore = createStore({
//   task: null,
//   startEditing: task => ({ task }),
//   stopEditing: () => ({ task: null }),
// })

export const mapRenderFnArgs = fn => Comp => ({ children, ...otherProps }) => (
  <Comp children={props => children(fn(props))} {...otherProps} />
)

const EditingTaskId = mapRenderFnArgs(
  ({ value: editingTaskId, set: setEditingTaskId }) => ({
    editingTaskId,
    setEditingTaskId,
    getTaskKey: task =>
      task.id === editingTaskId
        ? `editing-${task.id}`
        : `not-editing-${task.id}`,
    isEditingTask: task => task.id === editingTaskId,
  }),
)(createStringValue(null))

const EditTaskStore = adopt(
  {
    taskId: <Value initial={null} />,
    eid: <EditingTaskId />,
  },
  ({ taskId, eid }) => ({
    getTaskKey: task =>
      task.id === taskId.value
        ? `editing-${task.id}`
        : `not-editing-${task.id}`,
    isEditingTask: task => task.id === taskId.value,
    setEditingTaskId: taskId.set,
    eid,
  }),
)

const tasksContainerClass = style(
  //
  verticallySpaced(rem(1.5)),
  relative,
)

const PoseDiv = pose.div({
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
})

export function TaskList({ title, tasks, ...otherProps }) {
  const titleClass = style({
    fontSize: rem(1.5),
    marginBottom: rem(1),
  })
  return (
    <div>
      <PoseGroup>
        <PoseDiv key={title} className={titleClass}>
          {title}
        </PoseDiv>
      </PoseGroup>
      <EditTaskStore
        children={({ isEditingTask, getTaskKey, setEditingTaskId }) => (
          <div className={tasksContainerClass}>
            <PoseGroup>
              {tasks.map(task => (
                <PoseDiv key={getTaskKey(task)}>
                  {isEditingTask(task) ? (
                    <InlineEditTask
                      task={task}
                      dismissEditing={() => setEditingTaskId(null)}
                      {...otherProps}
                    />
                  ) : (
                    <TaskDisplayItem
                      task={task}
                      startEditing={() => setEditingTaskId(task.id)}
                      {...otherProps}
                    />
                  )}
                </PoseDiv>
              ))}
            </PoseGroup>
          </div>
        )}
      />
    </div>
  )
}
