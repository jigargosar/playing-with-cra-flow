// @flow

import type { TaskModel } from '../models/Task'
import { getTaskTags } from '../models/Task'
import * as React from 'react'
import { Fragment } from 'react'
import { LinkToCategory, LinkToTag } from './Links'
import { CollectionConsumer, renderWithCollections } from './CollectionContext'
import { content, flex, horizontal, rem, style } from '../typestyle-exports'
import { fg } from '../styles'
import { Match } from '@reach/router'
import { intersperse, pick } from 'ramda'
import { blackA } from '../colors'
import { Dialog } from '@reach/dialog/'
import { categories } from '../models/Category'
import Component from '@reach/component-component'
import { horizontallySpaced, vertical, verticallySpaced } from 'csstips/'
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

type TaskProps = {
  task: TaskModel,
  setEditingTaskId: string => any,
}

type EditTaskDialogProps = { task: TaskModel, close: Function, isOpen: boolean }

export function EditTaskDialog({ task, close, isOpen }: EditTaskDialogProps) {
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

export function renderInlineEditTask(
  dismissEditing: Function,
  task: TaskModel,
) {
  return (
    <FocusTrap
      focusTrapOptions={{ onDeactivate: dismissEditing }}
      children={renderWithCollections(({ updateTask }) => (
        <ObjectValue
          defaultValue={task}
          children={({ value: { title, category }, set }) => {
            return (
              <div>
                <div>Editing</div>
                <InputGroup
                  value={title}
                  onChange={e => set('title', e.target.value)}
                />
                <HTMLSelect
                  value={category}
                  onChange={e => set('category', e.target.value)}
                  options={categories}
                />
                <Button
                  onClick={() => {
                    updateTask({ title, categories }, task)
                    dismissEditing()
                  }}
                >
                  Save
                </Button>
                <Button onClick={dismissEditing}>Cancel</Button>
              </div>
            )
          }}
        />
      ))}
    />
  )
}

export const Task = ({ task, setEditingTaskId }: TaskProps) => (
  <div className={style(horizontal, horizontallySpaced('0.3rem'))} tabIndex={0}>
    <div className={style(flex)}>
      <div onClick={() => setEditingTaskId(task.id)}>{task.title}</div>

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
