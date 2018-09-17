import { style } from 'typestyle/'
import { rem } from 'csx/'
import { verticallySpaced } from 'csstips/'
import { InlineEditTask, Task } from './Task'
import * as React from 'react'
import type { TaskModel } from '../models/Task'
import { createStringValue } from 'react-values'
import posed, { PoseGroup } from 'react-pose'
import { tween } from 'popmotion'

type Props = { title: string, tasks: TaskModel[] }

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

const PoseItem = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
  flip: {
    transition: tween,
  },
})

const PoseItem2 = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: 300 },
  exit: { opacity: 0 },
  flip: {
    transition: tween,
  },
})

export function TaskList({ title, tasks }: Props) {
  const titleClass = style({
    fontSize: rem(1.5),
    marginBottom: rem(1),
  })
  return (
    <div>
      <div className={titleClass}>{title}</div>
      <EditingTaskId
        children={([{ isEditingTask, getTaskKey, setEditingTaskId }]) => (
          <div className={style(verticallySpaced(rem(1.5)))}>
            <PoseGroup>
              {tasks.map(task => (
                <PoseItem key={task.id}>
                  <PoseGroup animateOnMount={true}>
                    {[
                      <PoseItem2 key={isEditingTask(task) ? 'e' : 'ne'}>
                        {isEditingTask(task) ? (
                          <InlineEditTask
                            dismissEditing={() => setEditingTaskId(null)}
                            task={task}
                          />
                        ) : (
                          <Task
                            task={task}
                            startEditing={() => setEditingTaskId(task.id)}
                          />
                        )}
                      </PoseItem2>,
                    ]}
                  </PoseGroup>
                </PoseItem>
              ))}
            </PoseGroup>
          </div>
        )}
      />
    </div>
  )
}
