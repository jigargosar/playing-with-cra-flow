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
} from '../typestyle-exports'
import { strike, ttu } from '../styles'

const fz = { sm: { fontSize: rem(0.8) } }

function renderEditTaskDialogTrigger(task, render) {
  return (
    <Component initialState={{ showDialog: false, task }}>
      {({ state, setState }) => (
        <Fragment>
          {render({ open: () => setState({ showDialog: true }) })}
          {state.showDialog && (
            <EditTaskDialog
              onDismiss={() => setState({ showDialog: false })}
              task={state.task}
            />
          )}
        </Fragment>
      )}
    </Component>
  )
}

const taskTitleClass = task => style(task.done && strike)
export const Task = ({ task }: { task: TaskModel }) => (
  <div className={style(horizontal)}>
    <div className={style(flex)}>
      {renderEditTaskDialogTrigger(task, ({ open }) => (
        <div onClick={open} className={taskTitleClass(task)}>
          {task.title}
        </div>
      ))}
      <LinkToCategory className={style(fz.sm)} category={task.category} />
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
    <div className={style(content)} />
  </div>
)
