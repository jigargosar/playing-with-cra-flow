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
import { anyPass, cond, invoker, mathMod, tap } from 'ramda'
import { atIndex } from '../folktale-helpers'
import { isHotkey } from 'is-hotkey'

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
            const isArrowUp = isHotkey('ArrowUp')
            const isArrowDown = isHotkey('ArrowDown')
            const isArrowLeft = isHotkey('ArrowLeft')
            const isArrowRight = isHotkey('ArrowRight')

            cond([
              //
              [
                isArrowUp,
                () => setState({ idx: mathMod(idx - 1, totalCount) }),
              ],
              [
                isArrowDown,
                () => setState({ idx: mathMod(idx + 1, totalCount) }),
              ],
              [isArrowLeft, () => setState({ idx: mathMod(0, totalCount) })],
              [
                isArrowRight,
                () => setState({ idx: mathMod(totalCount - 1, totalCount) }),
              ],
            ])(e)

            const isArrowKey = anyPass([
              isArrowUp,
              isArrowDown,
              isArrowRight,
              isArrowLeft,
            ])

            if (isArrowKey(e)) {
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
