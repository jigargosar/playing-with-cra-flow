// @flow

import type { TaskModel } from '../models/Task'
import { getTaskTags } from '../models/Task'
import * as React from 'react'
import { Fragment } from 'react'
import { LinkToCategory, LinkToTag } from './Links'
import { CollectionConsumer, renderWithCollections } from './CollectionContext'
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
import { intersperse, pick } from 'ramda'
import { showMoveTaskDialog } from './MoveTaskDialog'
import { blackA } from '../colors'
import { ModalState } from './EditTaskDialog'
import { Dialog } from '@reach/dialog/'
import { vertical, verticallySpaced } from 'csstips'
import { categories } from '../models/Category'
import Component from '@reach/component-component'

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

function EditTaskDialog({ task, close, isOpen }) {
  return (
    <Dialog
      className={style(verticallySpaced(rem(1)))}
      onDismiss={close}
      isOpen={isOpen}
    >
      <Component initialState={pick(['title', 'category'])(task)}>
        {({ state: { title, category }, setState }) => (
          <Fragment>
            <h3>Edit Task </h3>
            <div className={style(vertical)}>
              <input
                type={'text'}
                value={title}
                onChange={e => setState({ title: e.target.value })}
              />
            </div>
            <div className={style(vertical)}>
              <select
                value={category}
                onChange={e => setState({ category: e.target.value })}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {renderWithCollections(({ updateTask }) => (
                <button
                  onClick={() => {
                    updateTask({ title, category }, task)
                    close()
                  }}
                >
                  Ok
                </button>
              ))}
            </div>
          </Fragment>
        )}
      </Component>
    </Dialog>
  )
}

export const Task = ({ task }: TaskProps) => (
  <div className={containerClass} tabIndex={0}>
    <div className={style(flex)}>
      <ModalState
        trigger={({ open }) => (
          <div onClick={open} className={style(task.done && strike)}>
            {task.title}
          </div>
        )}
      >
        {({ close, isOpen }) => EditTaskDialog({ close, isOpen, task })}
      </ModalState>
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
