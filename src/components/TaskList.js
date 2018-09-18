import { style } from 'typestyle/'
import { rem } from 'csx/'
import { verticallySpaced } from 'csstips/'
import { InlineEditTask, TaskDisplayItem } from './Task'
import * as React from 'react'
import { createStringValue } from 'react-values'
import { relative } from '../styles'
import pose, { PoseGroup } from 'react-pose'

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

function renderTask(isEditingTask, task, setEditingTaskId) {
  return isEditingTask(task) ? (
    <InlineEditTask dismissEditing={() => setEditingTaskId(null)} task={task} />
  ) : (
    <TaskDisplayItem
      task={task}
      startEditing={() => setEditingTaskId(task.id)}
    />
  )
}

export function TaskList({ title, tasks }) {
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
      <EditingTaskId
        children={({ isEditingTask, getTaskKey, setEditingTaskId }) => (
          <div className={tasksContainerClass}>
            <PoseGroup>
              {tasks.map(task => (
                <PoseDiv key={getTaskKey(task)}>
                  {renderTask(isEditingTask, task, setEditingTaskId)}
                </PoseDiv>
              ))}
            </PoseGroup>
          </div>
        )}
      />
    </div>
  )
}
