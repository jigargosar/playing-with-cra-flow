// import * as React from 'react'
import { TaskList } from './TaskList'
import { generateTaskList } from '../models/Task'
import { theme } from './theme'

export default [
  {
    component: TaskList,
    props: {
      theme,
      tasks: generateTaskList(),
    },
  },
]
