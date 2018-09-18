import { getTaskTags } from '../models/Task'
import * as React from 'react'
import { LinkToCategory, LinkToTag } from './Links'
import { CollectionConsumer } from './CollectionContext'
import { content, flex } from '../typestyle-exports'
import { fg } from '../styles'
import { intersperse, pick } from 'ramda'
import { blackA } from '../colors'
import { categories } from '../models/Category'
import {
  flex1,
  horizontal,
  horizontallySpaced,
  verticallySpaced,
} from 'csstips/'
import { Button, HTMLSelect, InputGroup } from '@blueprintjs/core'
import { classes, style } from 'typestyle/'
import { FocusTrap } from './FocusTrap'
import { adopt } from 'react-adopt'
import { Form } from 'react-powerplug'
import { EditTaskConsumer } from '../contexts/EditTask'
import { fz } from '../theme'

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

const TaskForm = adopt(
  {
    actions: <EditTaskConsumer />,
    collections: <CollectionConsumer />,
    form: ({ task, render }) => <Form initial={task} children={render} />,
    props: ({ task, render }) => render({ task }),
  },
  props => {
    const {
      props: { task },
      collections: { updateTask },
      form: { input, values },
      actions,
    } = props
    return {
      save: () => {
        updateTask(pick(['title', 'category'])(values), task)
        actions.stopEditingTask()
      },
      cancel: () => actions.stopEditingTask(),
      input,
    }
  },
)

export function InlineEditTask({ task, className }) {
  return (
    <FocusTrap
      className={className}
      focusTrapOptions={{
        // onDeactivate: dismissEditing,
        clickOutsideDeactivates: true,
      }}
    >
      <TaskForm
        task={task}
        children={({ input, save, cancel }) => {
          return (
            <div className={style(verticallySpaced('1rem'))}>
              <div className={style(horizontal, horizontallySpaced('0.3rem'))}>
                <InputGroup className={style(flex1)} {...input('title').bind} />
                <HTMLSelect {...input('category').bind} options={categories} />
              </div>
              <div className={style(horizontal, horizontallySpaced('0.3rem'))}>
                <Button onClick={save}>Save</Button>
                <Button onClick={cancel}>Cancel</Button>
              </div>
            </div>
          )
        }}
      />
    </FocusTrap>
  )
}

export const TaskDisplayItem = ({
  task,
  startEditing,
  className,
  category,
}) => {
  const rootClass = style(horizontal, horizontallySpaced('0.3rem'))
  return (
    <div className={classes(rootClass, className)} tabIndex={0}>
      <div className={style(flex)}>
        <div onClick={startEditing}>{task.title}</div>
        {renderTags(task)}
      </div>
      {task.category !== category && (
        <div className={style(content)}>
          {
            <LinkToCategory
              className={style(fz.sm, fg(blackA(0.5)))}
              category={task.category}
            />
          }
        </div>
      )}
    </div>
  )
}
