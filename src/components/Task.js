// @flow

import type { TaskModel } from '../models/Task'
import { getTaskTags } from '../models/Task'
import * as React from 'react'
import { LinkToCategory, LinkToTag } from './Links'
import { CollectionConsumer, renderWithCollections } from './CollectionContext'
import { content, flex, rem, style } from '../typestyle-exports'
import { fg } from '../styles'
import { Match } from '@reach/router'
import { intersperse } from 'ramda'
import { blackA } from '../colors'
import { categories } from '../models/Category'
import {
  flex1,
  horizontal,
  horizontallySpaced,
  verticallySpaced,
} from 'csstips/'
import { Button, HTMLSelect, InputGroup } from '@blueprintjs/core'
import { ObjectValue } from 'react-values'
import FocusTrap from 'focus-trap-react'

const fz = { sm: { fontSize: rem(0.8) }, xs: { fontSize: rem(0.7) } }

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
type IP = {
  dismissEditing: Function,
  task: TaskModel,
}

export function InlineEditTask({ dismissEditing, task }: IP) {
  return (
    <FocusTrap
      active={false}
      focusTrapOptions={{
        onDeactivate: dismissEditing,
        clickOutsideDeactivates: true,
      }}
      children={renderWithCollections(({ updateTask }) => (
        <ObjectValue
          defaultValue={task}
          children={({ value: { title, category }, set }) => {
            return (
              <div className={style(verticallySpaced('1rem'))}>
                <div
                  className={style(horizontal, horizontallySpaced('0.3rem'))}
                >
                  <InputGroup
                    className={style(flex1)}
                    value={title}
                    onChange={e => set('title', e.target.value)}
                  />
                  <HTMLSelect
                    value={category}
                    onChange={e => set('category', e.target.value)}
                    options={categories}
                  />
                </div>
                <div
                  className={style(horizontal, horizontallySpaced('0.3rem'))}
                >
                  <Button
                    onClick={() => {
                      updateTask({ title, category }, task)
                      dismissEditing()
                    }}
                  >
                    Save
                  </Button>
                  <Button onClick={dismissEditing}>Cancel</Button>
                </div>
              </div>
            )
          }}
        />
      ))}
    />
  )
}

type TaskProps = {
  task: TaskModel,
  startEditing: Function,
}

export const Task = ({ task, startEditing }: TaskProps) => (
  <div className={style(horizontal, horizontallySpaced('0.3rem'))} tabIndex={0}>
    <div className={style(flex)}>
      <div onClick={startEditing}>{task.title}</div>

      {/*<ModalState*/}
      {/*trigger={({ open }) => (*/}
      {/*<div onClick={open} className={style(task.done && strike)}>*/}
      {/*{task.title}*/}
      {/*</div>*/}
      {/*)}*/}
      {/*>*/}
      {/*{props => <EditTaskDialog {...props} task={task} />}*/}
      {/*</ModalState>*/}
      {renderTags(task)}
    </div>
    <div className={style(content)}>{renderCategory(task)}</div>
  </div>
)
