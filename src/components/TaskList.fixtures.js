import * as React from 'react'
import { TaskList } from './TaskList'
import { createTaskList } from '../models/Task'

export default [
  {
    component: TaskList,
    props: {
      tasks: createTaskList(),
    },
  },
]
