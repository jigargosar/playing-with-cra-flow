// @flow

import * as React from 'react'
import type { Task } from '../models/Task'
import { styled } from 'reakit'
import type { Tag } from '../models/Tag'

type Props = {
  tasks: Task[],
  getTaskTags: Task => Tag[],
}

export function TaskList({ tasks, getTaskTags }: Props) {
  return (
    <TaskItemsLayout>
      {tasks.map(task => (
        <TaskItem key={task.id}>
          <TaskTitle done={task.done}>{task.title}</TaskTitle>
          <TaskCategory>{task.category}</TaskCategory>
          <TagItems>
            {getTaskTags(task).map(tag => (
              <TagItem key={tag.id}>{`#${tag.title}`}</TagItem>
            ))}
          </TagItems>
        </TaskItem>
      ))}
    </TaskItemsLayout>
  )
}

TaskList.defaultProps = {
  category: null,
}

const TaskTitle = styled.div`
  text-decoration: ${p => (p.done ? 'line-through' : null)};
`
const TaskCategory = styled.div`
  text-transform: uppercase;
`
const TaskItem = styled.div``
const TaskItemsLayout = styled.div`
  > ${TaskItem} {
    margin: 1rem 0;
  }
`
const TagItem = styled.span`
  text-transform: uppercase;
  margin-right: 0.5rem;
`
const TagItems = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
`
