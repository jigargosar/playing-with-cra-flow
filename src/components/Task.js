// @flow

import type { TaskModel } from '../models/Task'
import { getTaskTags } from '../models/Task'
import * as React from 'react'
import { LinkToCategory, LinkToTag } from './Links'
import { CollectionConsumer } from './CollectionContext'
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
import { EditTaskDialogConsumer } from './EditTaskDialog'

const fz = { sm: { fontSize: rem(0.8) }, xs: { fontSize: rem(0.7) } }
const appearOnParentHoverClass = 'appearOnParentHover'
const hasHiddenChildren = {
  $nest: {
    [`.${appearOnParentHoverClass}`]: {
      transition: 'opacity .15s ease-in',
    },
    [`&:not(:hover) .${appearOnParentHoverClass}`]: { opacity: 0 },
  },
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
type TaskProps = {
  task: TaskModel,
}
export const Task = ({ task }: TaskProps) => (
  <div className={containerClass}>
    <div className={style(flex)}>
      <EditTaskDialogConsumer>
        {({ startEditingTask }) => (
          <div
            onClick={startEditingTask(task)}
            className={style(task.done && strike)}
          >
            {task.title}
          </div>
        )}
      </EditTaskDialogConsumer>
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
