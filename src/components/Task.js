import { styled } from 'reakit'
import type { Task as TaskModel } from '../models/Task'
import { getTaskTags } from '../models/Task'
import { CollectionsContext } from '../App'
import * as React from 'react'
import { Fragment } from 'react'
import { LinkToCategory, LinkToTag } from './Links'
import { Dialog } from '@reach/dialog'
import Component from '@reach/component-component'
import '@reach/dialog/styles.css'

export const TaskItem = ({ task }: { task: TaskModel }) => (
  <Layout>
    <Layout.Left>
      <Title done={task.done}>{task.title}</Title>
      <Category>
        <LinkToCategory category={task.category} />
      </Category>
      <Tags>
        <CollectionsContext.Consumer
          children={({ tags }) =>
            getTaskTags(task, tags).map(tag => (
              <Tag key={tag.id}>
                <LinkToTag tag={tag} />
              </Tag>
            ))
          }
        />
      </Tags>
    </Layout.Left>
    <Layout.Right>
      <Component initialState={{ showDialog: false, task }}>
        {({ state, setState }) => (
          <Fragment>
            <button onClick={() => setState({ showDialog: true})}>Edit</button>
            {state.showDialog && (
              <Dialog onDismiss={() => setState({ showDialog: false })}>
                <h2 style={{ marginTop: 0 }}>Edit Task</h2>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '1rem',
                  }}
                >
                  <input type={'text'} defaultValue={task.title} />
                </div>
                <button onClick={() => setState({ showDialog: false })}>
                  Ok
                </button>
              </Dialog>
            )}
          </Fragment>
        )}
      </Component>
    </Layout.Right>
  </Layout>
)
const Layout = styled.div`
  display: flex;
`
Layout.Left = styled.div`
  flex: 1 1 auto;
  margin-left: 1rem;
`
Layout.Right = styled.div`
  flex: none;
  margin-right: 1rem;
`
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
