// @flow

import * as React from 'react'
import type { Task } from '../models/Task'

type Props = {
  tasks: Task[],
}

export function TaskList({ tasks }: Props) {
  return (
    <div>
      <h1>TaskList</h1>
      {tasks.map(task => {
        return (
          <div key={task.id} style={{ margin: '1rem' }}>
            <div>{task.title}</div>
            <div style={{ fontSize: '14px', textTransform: 'uppercase' }}>
              {task.category}
            </div>
          </div>
        )
      })}
    </div>
  )
}
