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
import { content, flex, horizontal, rem, style } from '../typestyle-exports'
import { cText, dim2Color, dimColor, hover, strike } from '../styles'
import { Match } from '@reach/router'
import { intersperse } from 'ramda'

const fz = { sm: { fontSize: rem(0.8) }, xs: { fontSize: rem(0.7) } }

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

const taskTitleClass = task => style(task.done && strike, cText)

export const Task = ({ task }: { task: TaskModel }) => (
  <div className={style(horizontal)}>
    <div className={style(flex)}>
      {renderEditTaskDialogTrigger(task, ({ open }) => (
        <div onClick={open} className={taskTitleClass(task)}>
          {task.title}
        </div>
      ))}

      <div className={style({ color: dim2Color }, fz.xs, { lineHeight: 1.5 })}>
        <CollectionConsumer
          children={({ tags }) =>
            intersperse(', ')(
              getTaskTags(task, tags).map(tag => (
                <LinkToTag key={tag.title} tag={tag} />
              )),
            )
          }
        />
      </div>
    </div>
    <div className={style(content)}>
      <Match path={'/category/*'}>
        {props =>
          props.match ? null : (
            <LinkToCategory
              className={style(fz.sm, { color: dimColor })}
              category={task.category}
            />
          )
        }
      </Match>
    </div>
    <div className={style(content)}>
      <div className={style(hover({ visibility: 'hidden' }))}>...</div>
    </div>
  </div>
)
