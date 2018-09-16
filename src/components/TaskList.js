// @flow
import { style } from 'typestyle/'
import { rem } from 'csx/'
import { verticallySpaced } from 'csstips/'
import { InlineEditTask, Task } from './Task'
import * as React from 'react'
import { Fragment } from 'react'
import type { TaskModel } from '../models/Task'
import { createStringValue } from 'react-values'
import Composer from 'react-composer'

type Props = { title: string, tasks: TaskModel[] }

const EditingTaskId = createStringValue(null)

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
        children={([{ value: editingTaskId, set: setEditingTaskId }]) => (
          <div className={tasksClass}>
            {tasks.map(task => {
              return (
                <Fragment key={task.id}>
                  {task.id === editingTaskId ? (
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
                </Fragment>
              )
            })}
          </div>
        )}
      />
    </div>
  )
}
