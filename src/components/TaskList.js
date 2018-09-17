import { style } from 'typestyle/'
import { rem } from 'csx/'
import { verticallySpaced } from 'csstips/'
import { InlineEditTask, Task } from './Task'
import * as React from 'react'
import type { TaskModel } from '../models/Task'
import { createStringValue } from 'react-values'
import Composer from 'react-composer'
import pose, { PoseGroup } from 'react-pose'
import { tween } from 'popmotion'

type Props = { title: string, tasks: TaskModel[] }

export const mapRenderFnArgs = fn => Comp => ({ children, ...otherProps }) => (
  <Comp children={props => children(fn(props))} {...otherProps} />
)

const EditingTaskId = mapRenderFnArgs(
  ({ value: editingTaskId, set: setEditingTaskId }) => ({
    editingTaskId,
    setEditingTaskId,
  }),
)(createStringValue(null))

const PoseDiv = pose.div({
  enter: { opacity: 1 },
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
  const tasksClass = style(verticallySpaced(rem(1.5)))

  return (
    <div>
      <div className={titleClass}>{title}</div>
      <Composer
        components={[<EditingTaskId />]}
        children={([{ editingTaskId, setEditingTaskId }]) => {
          const getTaskKey = task =>
            task.id === editingTaskId ? 'editing' : task.id
          const isEditingTask = task => task.id === editingTaskId

          return (
            <div className={tasksClass}>
              <PoseGroup>
                {tasks.map(task => {
                  return (
                    <PoseDiv key={getTaskKey(task)}>
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
                    </PoseDiv>
                  )
                })}
              </PoseGroup>
            </div>
          )
        }}
      />
    </div>
  )
}
