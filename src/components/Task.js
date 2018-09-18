import { getTaskTags } from '../models/Task'
import * as React from 'react'
import { LinkToCategory, LinkToTag } from './Links'
import { CollectionConsumer } from './CollectionContext'
import { content, flex, rem } from '../typestyle-exports'
import { fg } from '../styles'
import { intersperse, map, prop } from 'ramda'
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
import { classes, style } from 'typestyle/'
import { FocusTrap } from './FocusTrap'
import { Adopt } from 'react-adopt'
import { Input } from 'react-powerplug'

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

export function InlineEditTask({ dismissEditing, task, className }) {
  return (
    <FocusTrap
      className={className}
      focusTrapOptions={{
        // onDeactivate: dismissEditing,
        clickOutsideDeactivates: true,
      }}
    >
      <Adopt
        mapper={{
          c: <CollectionConsumer />,
          et: <ObjectValue defaultValue={task} />,
          title: <Input initial={task.title} />,
          category: <Input initial={task.category} />,
        }}
        mapProps={({ title, category, c: { updateTask }, et: { set } }) => ({
          updateTask,
          title,
          category,
          set,
        })}
        children={({ updateTask, title, category, set }) => {
          return (
            <div className={style(verticallySpaced('1rem'))}>
              <div className={style(horizontal, horizontallySpaced('0.3rem'))}>
                <InputGroup className={style(flex1)} {...title.bind} />
                <HTMLSelect {...category.bind} options={categories} />
              </div>
              <div className={style(horizontal, horizontallySpaced('0.3rem'))}>
                <Button
                  onClick={() => {
                    updateTask(map(prop('value'))({ title, category }), task)
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
