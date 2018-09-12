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
  classes,
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
const appearOnParentHoverClass = 'appearOnParentHover'
const hasHiddenChildren = {
  $nest: {
    [`.${appearOnParentHoverClass}`]: {
      transition: '.15s ease-in',
    },
    [`&:not(:hover) .${appearOnParentHoverClass}`]: { opacity: 0 },
  },
}

function renderEditTaskDialogTrigger(render) {
  return (
    <Component initialState={{ showDialog: false, task: null }}>
      {({ state, setState }) => (
        <Fragment>
          {render({
            startEditingTask: task => () =>
              setState({ showDialog: true, task }),
          })}
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
      {renderEditTaskDialogTrigger(({ startEditingTask }) => (
        <div
          onClick={startEditingTask(task)}
          className={style(task.done && strike)}
        >
          {task.title}
        </div>
      ))}
      {renderTags(task)}
    </div>
    <div className={style(content)}>{renderCategory(task)}</div>
    <div className={style(content, horizontal /*, bg('red')*/)}>
      <div
        className={classes(
          appearOnParentHoverClass,
          style(padding(0, '0.5rem'), selfStretch, pointer),
        )}
      >
        ...
      </div>
    </div>
  </div>
)
