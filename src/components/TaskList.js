// @flow

import * as React from 'react'
import { Component } from 'react'
import type { Task } from '../models/Task'

type Props = {
  tasks: Task[],
}

export class TaskList extends Component<Props> {
  render() {
    return (
      <div>
        <h1>TaskList</h1>
        {this.props.tasks.map(task => {
          return (
            <div key={task.id}>
              <div>{task.title}</div>
            </div>
          )
        })}
      </div>
    )
  }
}
