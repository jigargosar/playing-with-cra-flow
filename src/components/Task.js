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
import { fg, pointer, strike } from '../styles'
import { Match } from '@reach/router'
import { intersperse } from 'ramda'
import { showEditTaskDialog } from './EditTaskDialog'
import { showMoveTaskDialog } from './MoveTaskDialog'
import { blackA } from '../colors'

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
    <div className={style(fg(blackA(0.5)), fz.xs, { lineHeight: 1.5 })}>
      <CollectionConsumer>
        {({ tags }) =>
          intersperse(', ')(
            getTaskTags(task, tags).map(tag =>
              tag
                .map(tag => <LinkToTag key={tag.title} tag={tag} />)
                .getOrElse('unknown tag'),
            ),
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
            className={style(fz.sm, fg(blackA(0.5)))}
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
  <div className={containerClass} tabIndex={0}>
    <div className={style(flex)}>
      {showEditTaskDialog(task, handler => (
        <div onClick={handler} className={style(task.done && strike)}>
          {task.title}
        </div>
      ))}
      {renderTags(task)}
    </div>
    <div className={style(content)}>{renderCategory(task)}</div>
    <div className={style(content, horizontal /*, bg('red')*/)}>
      {showMoveTaskDialog(task, handler => (
        <div
          onClick={handler}
          className={classes(
            appearOnParentHoverClass,
            style(padding(0, '0.5rem'), selfStretch, pointer),
          )}
        >
          ...
        </div>
      ))}
    </div>
  </div>
)
