import * as React from 'react'
import { TaskList } from './TaskList'

export default [
  {
    component: TaskList,
    props: {
      children: (
        <TaskList.Items>
          <TaskList.Item>
            <TaskList.ItemTitle>
              I am a task
            </TaskList.ItemTitle>
          </TaskList.Item>
        </TaskList.Items>
      ),
    },
  },
]
