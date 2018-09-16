// @flow
import { style } from 'typestyle/'
import { rem } from 'csx/'
import { verticallySpaced } from 'csstips/'
import { renderInlineEditTask, Task } from './Task'
import * as React from 'react'
import type { TaskModel } from '../models/Task'
import { ArrowKeyNavigator } from './ArrowKeyNavigator'
import { createStringValue } from 'react-values'

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
      <EditingTaskId
        children={({ value: editingTaskId, set: setEditingTaskId }) => {
          return (
            <ArrowKeyNavigator>
              {({ containerRef, onKeyDown }) => (
                <div
                  ref={containerRef}
                  className={tasksClass}
                  onKeyDown={editingTaskId && onKeyDown}
                >
                  {tasks.map(task => {
                    const isEditing = task.id === editingTaskId
                    const dismissEditing = () => setEditingTaskId(null)
                    if (isEditing) {
                      return renderInlineEditTask(dismissEditing, task)
                    }
                    return (
                      <Task
                        key={task.id}
                        task={task}
                        setEditingTaskId={setEditingTaskId}
                      />
                    )
                  })}
                </div>
              )}
            </ArrowKeyNavigator>
          )
        }}
      />
    </div>
  )
}
