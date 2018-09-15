// @flow
import { style } from 'typestyle/'
import { rem } from 'csx/'
import { verticallySpaced } from 'csstips/'
import { Task } from './Task'
import * as React from 'react'
import type { TaskModel } from '../models/Task'
import { ArrowKeyNavigator } from './ArrowKeyNavigator'

type Props = { title: string, tasks: TaskModel[] }

export function TaskList({ title, tasks }: Props) {
  const titleClass = style({
    fontSize: rem(1.5),
    marginBottom: rem(1),
  })
  const tasksClass = style(verticallySpaced(rem(1.5)))

  return (
    <div>
      <div className={titleClass}>{title}</div>
      <ArrowKeyNavigator>
        {({ containerRef, onKeyDown }) => (
          <div ref={containerRef} className={tasksClass} onKeyDown={onKeyDown}>
            {tasks.map(task => (
              <Task key={task.id} task={task} />
            ))}
          </div>
        )}
      </ArrowKeyNavigator>
    </div>
  )
}
