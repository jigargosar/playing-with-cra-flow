// @flow

import * as React from 'react'
import type { Task } from '../models/Task'
import { styled } from 'reakit'
import type { Tag, TagId } from '../models/Tag'

type Props = {
  tasks: Task[],
  findTagById: TagId => Tag,
}

export function TaskList({ tasks }: Props) {
  return (
    <TaskItemsLayout>
      {tasks.map(task => (
        <TaskItem key={task.id}>
          <TaskTitle>{task.title}</TaskTitle>
          <Category>{task.category}</Category>
          <TagItemsLayout>
            {task.tagIds.map(tid => <TagItem key={tid}>{`#${tid}`}</TagItem>)}
          </TagItemsLayout>
        </TaskItem>
      ))}
    </TaskItemsLayout>
  )
}

const TaskTitle = styled.div``
const Category = styled.div`
  text-transform: uppercase;
  font-size: 14px;
`
const TaskItem = styled.div``
const TaskItemsLayout = styled.div`
  > ${TaskItem} {
    margin: 1rem 0;
  }
`
const TagItem = styled.span``
const TagItemsLayout = styled.div`
  display: inline-flex;
  margin: 0 -0.5rem;
  > ${TagItem} {
    margin: 0 0.5rem;
  }
`
