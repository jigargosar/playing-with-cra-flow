import { getTaskTags } from '../models/Task'
import * as React from 'react'
import { LinkToCategory, LinkToTag } from './Links'
import { CollectionConsumer } from './CollectionContext'
import { content, flex } from '../typestyle-exports'
import { fg } from '../styles'
import { compose, intersperse, map } from 'ramda'
import { blackA } from '../colors'
import { categories } from '../models/Category'
import { flex1 } from 'csstips/'
import { Button, HTMLSelect, Icon, InputGroup } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import { style } from 'typestyle/'
import { FocusTrap } from './FocusTrap'
import { adopt } from 'react-adopt'
import { Form } from 'react-powerplug'
import { EditTaskConsumer } from '../contexts/EditTask'
import { fz, lhCopy } from '../theme'
import { TaskCollectionConsumer } from '../contexts/TaskCollection'
import { HBox8, VBox16 } from '../lib/layout-components/Box'

const TaskForm = adopt(
  {
    actions: <EditTaskConsumer />,
    tasks: <TaskCollectionConsumer />,
    form: ({ task, render }) => <Form initial={task} children={render} />,
    props: ({ task, render }) => render({ task }),
  },
  props => {
    const {
      props: { task },
      form: { input, values },
      actions,
      tasks,
    } = props
    return {
      save: () => {
        tasks.updateTask(values, task)
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
        children={({ input, save, cancel }) => (
          <VBox16>
            <HBox8>
              <InputGroup className={style(flex1)} {...input('title').bind} />
              <HTMLSelect {...input('category').bind} options={categories} />
            </HBox8>
            <HBox8>
              <Button onClick={save}>Save</Button>
              <Button onClick={cancel}>Cancel</Button>
            </HBox8>
          </VBox16>
        )}
      />
    </FocusTrap>
  )
}

const renderTag = tag =>
  tag
    .map(tag => <LinkToTag key={tag.title} tag={tag} />)
    .getOrElse('unknown tag')

export const TaskDisplayItem = ({
  task,
  startEditing,
  className,
  category,
}) => {
  const isDone = task.done
  return (
    <HBox8 className={className} tabIndex={0}>
      <div>
        <TaskCollectionConsumer
          children={tasks => (
            <Button
              onClick={() => tasks.toggleDone(task)}
              minimal
              icon={<Icon icon={isDone ? IconNames.UPDATED : IconNames.TICK} />}
            />
          )}
        />
      </div>
      <div className={style(flex)}>
        <div onClick={startEditing}>{task.title}</div>
        <div className={style(fz.xs, lhCopy)}>
          <CollectionConsumer
            children={({ tags }) => {
              const taskTags = getTaskTags(task, tags)
              return compose(
                intersperse(', '),
                map(renderTag),
              )(taskTags)
            }}
          />
        </div>
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
    </HBox8>
  )
}
