// import * as React from 'react'
import { TaskList } from './TaskList'
import { createTaskList } from '../models/Task'
import { theme } from './theme'

export default [
  {
    component: TaskList,
    props: {
      theme,
      tasks: createTaskList(),
    },
  },
]
