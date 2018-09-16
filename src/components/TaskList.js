// @flow
import { style } from 'typestyle/'
import { rem } from 'csx/'
import { verticallySpaced } from 'csstips/'
import { InlineEditTask, Task } from './Task'
import * as React from 'react'
import type { TaskModel } from '../models/Task'
import { ArrowKeyNavigator } from './ArrowKeyNavigator'
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
        components={[
          <EditingTaskId />,
          ({ render }) => <ArrowKeyNavigator children={render} />,
        ]}
        children={([
          { value: editingTaskId, set: setEditingTaskId },
          { containerRef, onKeyDown, onFocus },
        ]) => (
          <div
            id={'task-list-container'}
            ref={containerRef}
            className={tasksClass}
            onKeyDown={editingTaskId ? null : onKeyDown}
            // onFocus={e => {
            //   window.t = e.target
            //   console.log(`e.target.closest("")`, e.target.closest('#an > *'))
            // }}
            onFocus={onFocus}
          >
            {tasks.map(task => {
              return task.id === editingTaskId ? (
                <InlineEditTask
                  key={task.id}
                  dismissEditing={() => setEditingTaskId(null)}
                  task={task}
                />
              ) : (
                <Task
                  key={task.id}
                  task={task}
                  startEditing={() => setEditingTaskId(task.id)}
                />
              )
            })}
          </div>
        )}
      />
    </div>
  )
}
