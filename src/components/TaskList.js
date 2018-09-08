// @flow

import * as React from 'react'
import { Fragment } from 'react'
import type { Task as TaskModel } from '../models/Task'
import { Divider, styled } from 'reakit'
import { TaskItem } from './Task'

type Props = {
  tasks: TaskModel[],
  title: string,
}

export const Tasks = styled.div`
  > * {
    margin: 1rem 0;
  }
`

export function TaskList({ tasks, title }: Props) {
  return (
    <Fragment>
      <h2>{title}</h2>
      <Tasks>
        {tasks.map(task => (
          <Fragment key={task.id}>
            <TaskItem task={task} />
            <Divider />
          </Fragment>
        ))}
      </Tasks>
    </Fragment>
  )
}
