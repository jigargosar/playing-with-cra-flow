import { style } from 'typestyle/'
import { rem } from 'csx/'
import { InlineEditTask, TaskDisplayItem } from './Task'
import * as React from 'react'
import { relative } from '../styles'
import pose, { PoseGroup } from 'react-pose'
import { EditTaskConsumer } from '../contexts/EditTask'
import { VBox16 } from '../lib/layout-components/Box'

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
        children={({ isEditingTask, getTaskKey, startEditingTask }) => (
          <VBox16 className={style(relative)}>
            <PoseGroup>
              {tasks.map(task => (
                <PoseDiv key={getTaskKey(task)}>
                  {isEditingTask(task) ? (
                    <InlineEditTask task={task} {...otherProps} />
                  ) : (
                    <TaskDisplayItem
                      task={task}
                      startEditing={() => startEditingTask(task)}
                      {...otherProps}
                    />
                  )}
                </PoseDiv>
              ))}
            </PoseGroup>
          </VBox16>
        )}
      />
    </div>
  )
}
