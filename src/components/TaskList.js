import { style } from 'typestyle/'
import { rem } from 'csx/'
import { verticallySpaced } from 'csstips/'
import { InlineEditTask, TaskDisplayItem } from './Task'
import * as React from 'react'
import { relative } from '../styles'
import pose, { PoseGroup } from 'react-pose'
import { EditTaskConsumer } from '../contexts/EditTask'

const tasksContainerClass = style(verticallySpaced(rem(1.5)), relative)

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
      <EditTaskConsumer
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
