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
  padding,
  rem,
  selfStretch,
  style,
} from '../typestyle-exports'
import { dim2Color, dimColor, pointer, strike } from '../styles'
import { Match } from '@reach/router'
import { intersperse } from 'ramda'

const fz = { sm: { fontSize: rem(0.8) }, xs: { fontSize: rem(0.7) } }
const hasHiddenChildren = {
  $nest: {
    '.appearOnHover': {
      transition: '.15s ease-in',
    },
    '&:not(:hover) .appearOnHover': { opacity: 0 },
  },
}

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

function renderTitle(task) {
  return renderEditTaskDialogTrigger(task, ({ open }) => (
    <div onClick={open} className={style(task.done && strike)}>
      {task.title}
    </div>
  ))
}
function renderTags(task) {
  return (
    <div className={style({ color: dim2Color }, fz.xs, { lineHeight: 1.5 })}>
      <CollectionConsumer>
        {({ tags }) =>
          intersperse(', ')(
            getTaskTags(task, tags).map(tag => (
              <LinkToTag key={tag.title} tag={tag} />
            )),
          )
        }
      </CollectionConsumer>
    </div>
  )
}
function renderCategory(task) {
  return (
    <Match path={`/category/${task.category}`}>
      {props =>
        props.match ? null : (
          <LinkToCategory
            className={style(fz.sm, { color: dimColor })}
            category={task.category}
          />
        )
      }
    </Match>
  )
}

const containerClass = style(horizontal, pointer, hasHiddenChildren)
export const Task = ({ task }: { task: TaskModel }) => (
  <div className={containerClass}>
    <div className={style(flex)}>
      {renderTitle(task)}
      {renderTags(task)}
    </div>
    <div className={style(content)}>{renderCategory(task)}</div>
    <div className={style(content, horizontal /*, bg('red')*/)}>
      <div
        className={style(
          // bg('blue'),
          padding(0, '1rem'),
          // flex,
          selfStretch,
          hasHiddenChildren,
          pointer,
        )}
      >
        ...
      </div>
    </div>
  </div>
)
