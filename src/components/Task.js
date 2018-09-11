// @flow

import type { TaskModel } from '../models/Task'
import { getTaskTags } from '../models/Task'
import * as React from 'react'
import { Fragment } from 'react'
import { LinkToCategory, LinkToTag } from './Links'
import Component from '@reach/component-component'
import '@reach/dialog/styles.css'
import { CollectionConsumer } from './CollectionContext'
import { EditTaskDialog } from './EditTaskDialog'
import {
  content,
  flex,
  horizontal,
  horizontallySpaced,
  rem,
  style,
} from '../typestyle'
import { strike, ttu } from '../styles'

const fz = { sm: { fontSize: rem(0.8) } }
export const Task = ({ task }: { task: TaskModel }) => (
  <div className={style(horizontal)}>
    <div className={style(flex)}>
      <div className={style(task.done && strike)}>{task.title}</div>
      <LinkToCategory className={style(fz.sm, ttu)} category={task.category} />
      <div className={style(horizontallySpaced(rem(0.5)))}>
        <CollectionConsumer
          children={({ tags }) =>
            getTaskTags(task, tags).map(tag => (
              <LinkToTag
                key={tag.title}
                className={style(fz.sm, ttu)}
                tag={tag}
              />
            ))
          }
        />
      </div>
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
