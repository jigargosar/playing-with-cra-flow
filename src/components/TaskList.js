// @flow

import * as React from 'react'
import type { Task } from '../models/Task'
import { styled } from 'reakit'

type Props = {
  tasks: Task[],
}

export function TaskList({ tasks }: Props) {
  return (
    <Items>
      {tasks.map(task => (
        <Item key={task.id}>
          <Title>{task.title}</Title>
          <Category>{task.category}</Category>
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
