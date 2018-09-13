// @flow
import { style } from 'typestyle'
import { rem } from 'csx'
import { verticallySpaced } from 'csstips'
import { Task } from './Task'
import * as React from 'react'
import type { TaskModel } from '../models/Task'

type Props = { title: string, tasks: TaskModel[] }

export function TaskList({ title, tasks }: Props) {
  return (
    <div>
      <div
        className={style({
          fontSize: rem(1.5),
          marginBottom: rem(1),
        })}
      >
        {title}
      </div>
      <div className={style(verticallySpaced(rem(1.5)))}>
        {tasks.map(task => <Task key={task.id} task={task} />)}
      </div>
    </div>
  )
}
