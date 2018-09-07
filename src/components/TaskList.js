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
    <Items>
      {tasks.map(task => (
        <Item key={task.id}>
          <Title>{task.title}</Title>
          <Category>{task.category}</Category>
          <TagItems>
            {task.tagIds.map(tid => <TagItem key={tid}>{tid}</TagItem>)}
          </TagItems>
        </Item>
      ))}
    </Items>
  )
}

const Title = styled.div``
const Category = styled.div`
  text-transform: uppercase;
  font-size: 14px;
`
const Item = styled.div``
const Items = styled.div`
  > ${Item} {
    margin: 1rem 0;
  }
`
const TagItem = styled.div``
const TagItems = styled.div`
  > ${TagItem} {
    margin: 1rem 0;
  }
`
