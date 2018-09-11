// @flow

import styled from 'react-emotion'
import type { TaskModel } from '../models/Task'
import { getTaskTags } from '../models/Task'
import * as React from 'react'
import { Fragment } from 'react'
import { LinkToCategory, LinkToTag } from './Links'
import Component from '@reach/component-component'
import '@reach/dialog/styles.css'
import { CollectionConsumer } from './CollectionContext'
import { EditTaskDialog } from './EditTaskDialog'
import { content, flex, horizontal, strike, style } from './typestyle'

export const Task = ({ task }: { task: TaskModel }) => (
  <div className={style(horizontal)}>
    <div className={style(flex)}>
      <div className={style(task.done && strike)}>{task.title}</div>
      <Category>
        <LinkToCategory category={task.category} />
      </Category>
      <Tags>
        <CollectionConsumer
          children={({ tags }) =>
            getTaskTags(task, tags).map(tag => (
              <Tag key={tag.id}>
                <LinkToTag tag={tag} />
              </Tag>
            ))
          }
        />
      </Tags>
    </div>
    <div className={style(content)}>
      <Component initialState={{ showDialog: false, task }}>
        {({ state, setState }) => (
          <Fragment>
            <button onClick={() => setState({ showDialog: true })}>Edit</button>
            {state.showDialog && (
              <EditTaskDialog
                onDismiss={() => setState({ showDialog: false })}
                task={task}
              />
            )}
          </Fragment>
        )}
      </Component>
    </div>
  </div>
)
const Title = styled.div`
  text-decoration: ${p => (p.done ? 'line-through' : null)};
`
const Category = styled.div`
  font-size: 0.8rem;
  text-transform: uppercase;
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
