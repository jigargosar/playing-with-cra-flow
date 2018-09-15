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
import { compareHotkey, isHotkey, parseHotkey } from 'is-hotkey'

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
        totalCount={tasks.length}
        initialState={{ idx: 0 }}
        getRefs={() => ({ container: React.createRef() })}
        didMount={didMountOrUpdate}
        didUpdate={didMountOrUpdate}
      >
        {({ refs, state: { idx }, setState, props: { totalCount } }) => {
          const onKeyDown = e => {
            const hotKey = parseHotkey('Arrow')
            const checkIfMatches = compareHotkey(hotKey, e)

            console.log(`checkIfMatches`, checkIfMatches)
            const isArrowUp = isHotkey('ArrowUp')
            const isArrowDown = isHotkey('ArrowDown')

            if (isArrowUp(e)) {
              setState({ idx: mathMod(idx - 1, totalCount) })
              e.preventDefault()
            } else if (isArrowDown(e)) {
              setState({ idx: mathMod(idx + 1, totalCount) })
              e.preventDefault()
            }
          }

          return (
            <div
              ref={refs.container}
              className={tasksClass}
              onKeyDown={onKeyDown}
            >
              {tasks.map(task => (
                <Task key={task.id} task={task} />
              ))}
            </div>
          )
        }}
      </Component>
    </div>
  )
}
