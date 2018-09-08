// @flow

import * as React from 'react'
import type { Task as TaskModel } from '../models/Task'
import { styled } from 'reakit'
import type { Tag as TagModel } from '../models/Tag'

type Props = {
  tasks: TaskModel[],
  getTaskTags: TaskModel => TagModel[],
}

export function TaskList({ tasks, getTaskTags }: Props) {
  return (
    <Tasks>
      {tasks.map(task => (
        <Task key={task.id}>
          <Title done={task.done}>{task.title}</Title>
          <Category>{task.category}</Category>
          <Tags>
            {getTaskTags(task).map(tag => (
              <Tag key={tag.id}>{`#${tag.title}`}</Tag>
            ))}
          </Tags>
        </Task>
      ))}
    </Tasks>
  )
}

TaskList.defaultProps = {
  category: null,
}

const Title = styled.div`
  text-decoration: ${p => (p.done ? 'line-through' : null)};
`
const Category = styled.div`
  text-transform: uppercase;
`
const Task = styled.div``
const Tasks = styled.div`
  > ${Task} {
    margin: 1rem 0;
  }
`
const Tag = styled.span`
  text-transform: uppercase;
  margin-right: 0.5rem;
`
const Tags = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
`
