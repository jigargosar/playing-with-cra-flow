// @flow
import { style } from 'typestyle/'
import { rem } from 'csx/'
import { verticallySpaced } from 'csstips/'
import { Task } from './Task'
import * as React from 'react'
import type { TaskModel } from '../models/Task'
import Component from '@reach/component-component'
import * as ReactDOM from 'react-dom'
import { nullableToMaybe } from 'folktale/conversions'
import { invoker, mathMod, tap } from 'ramda'
import { atIndex } from '../folktale-helpers'

type Props = { title: string, tasks: TaskModel[] }

export function TaskList({ title, tasks }: Props) {
  const titleClass = style({
    fontSize: rem(1.5),
    marginBottom: rem(1),
  })
  const tasksClass = style(verticallySpaced(rem(1.5)))
  const didMountOrUpdate = ({ refs, state: { idx } }) => {
    const containerEl = nullableToMaybe(
      ReactDOM.findDOMNode(refs.container.current),
    )
    containerEl.map(
      tap(el => {
        const elList = el.querySelectorAll(`:scope > [tabindex='0']`)
        const elToFocus = atIndex(idx, elList)
        requestAnimationFrame(() => elToFocus.map(invoker(0, 'focus')))
      }),
    )
  }
  return (
    <div>
      <div className={titleClass}>{title}</div>
      <Component
        initialState={{ idx: 0 }}
        getRefs={() => ({ container: React.createRef() })}
        didMount={didMountOrUpdate}
        didUpdate={didMountOrUpdate}
      >
        {({ refs, state: { idx }, setState }) => (
          <div
            ref={refs.container}
            className={tasksClass}
            onKeyDown={e => {
              if (e.key === 'ArrowUp') {
                setState({ idx: mathMod(idx - 1, tasks.length) })
              } else if (e.key === 'ArrowDown') {
                setState({ idx: mathMod(idx + 1, tasks.length) })
              }
            }}
          >
            {tasks.map(task => (
              <Task key={task.id} task={task} />
            ))}
          </div>
        )}
      </Component>
    </div>
  )
}
