// @flow

import * as React from 'react'
import { Fragment } from 'react'
import type { Task as TaskModel } from '../models/Task'
import { getTaskTags } from '../models/Task'
import { Divider, styled } from 'reakit'
import { CollectionContext } from '../App'

type Props = {
  tasks: TaskModel[],
}

const TaskItem = ({ task }: { task: TaskModel }) => (
  <Task>
    <Title done={task.done}>{task.title}</Title>
    <Category>{task.category}</Category>
    <Tags>
      <CollectionContext.Consumer
        children={({ tags }) =>
          getTaskTags(task, tags).map(tag => (
            <Tag key={tag.id}>{`#${tag.title}`}</Tag>
          ))
        }
      />
    </Tags>
  </Task>
)
export function TaskList({ tasks }: Props) {
  return (
    <Tasks>
      {tasks.map(task => (
        <Fragment key={task.id}>
          <TaskItem task={task} />
          <Divider />
        </Fragment>
      ))}
    </Tasks>
  )
}

const Title = styled.div`
  text-decoration: ${p => (p.done ? 'line-through' : null)};
`
const Category = styled.div`
  font-size: 0.8rem;
  text-transform: uppercase;
`
const Task = styled.div``
const Tasks = styled.div`
  > ${Task} {
    margin: 1rem 0;
  }
`
const Tag = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-right: 0.5rem;
`
const Tags = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
`
