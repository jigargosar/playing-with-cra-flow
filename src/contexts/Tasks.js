import * as React from 'react'
import { adopt } from 'react-adopt'
import { Value } from '../components/Value'
import { loadOrGenerateTasks } from '../models/Task'
import { map, pick } from 'ramda'

export const Tasks = adopt(
  {
    tasks: <Value initial={loadOrGenerateTasks} />,
  },
  ({ tasks }) => {
    return {
      value: tasks.value,
      updateTask: (changes, { id }) =>
        tasks.set(
          map(t => {
            return t.id === id
              ? { ...t, ...pick(['title', 'category'])(changes) }
              : t
          }),
        ),
    }
  },
)
