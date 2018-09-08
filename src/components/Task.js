import { styled } from 'reakit'
import type { Task as TaskModel } from '../models/Task'
import { getTaskTags } from '../models/Task'
import { CollectionContext } from '../App'
import * as React from 'react'
import { LinkToCategory, LinkToTag } from './Links'

export const TaskItem = ({ task }: { task: TaskModel }) => (
  <Task>
    <Title done={task.done}>{task.title}</Title>
    <Category>
      <LinkToCategory category={task.category} />
    </Category>
    <Tags>
      <CollectionContext.Consumer
        children={({ tags }) =>
          getTaskTags(task, tags).map(tag => (
            <Tag key={tag.id}>
              <LinkToTag tag={tag} />
            </Tag>
          ))
        }
      />
    </Tags>
  </Task>
)
const Title = styled.div`
  text-decoration: ${p => (p.done ? 'line-through' : null)};
`
const Category = styled.div`
  font-size: 0.8rem;
  text-transform: uppercase;
`
const Task = styled.div``
export const Tasks = styled.div`
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
