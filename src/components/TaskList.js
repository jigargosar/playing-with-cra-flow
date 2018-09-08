// @flow

import * as React from 'react'
import { Fragment } from 'react'
import type { Task as TaskModel } from '../models/Task'
import { Divider } from 'reakit'
import { TaskItem, Tasks } from './Task'

type Props = {
  tasks: TaskModel[],
  title: string,
}

export function TaskList({ tasks, title }: Props) {
  return (
    <div style={{ paddingTop: 1 }}>
      <h2>{title}</h2>
      <Tasks>
        {tasks.map(task => (
          <Fragment key={task.id}>
            <TaskItem task={task} />
            <Divider />
          </Fragment>
        ))}
      </Tasks>
    </div>
  )
}
