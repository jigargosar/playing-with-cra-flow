// @flow

import * as React from 'react'
import { Fragment } from 'react'
import type { Task as TaskModel } from '../models/Task'
import { Task } from './Task'

type Props = {
  tasks: TaskModel[],
  title: string,
}

export function TaskList({ tasks, title }: Props) {
  return (
    <Fragment>
      <h2>{title}</h2>
      {tasks.map(task => <Task key={task.id} task={task} />)}
    </Fragment>
  )
}
