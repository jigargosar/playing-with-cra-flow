// @flow
import { style } from 'typestyle/'
import { rem } from 'csx/'
import { verticallySpaced } from 'csstips/'
import { Task } from './Task'
import * as React from 'react'
import type { TaskModel } from '../models/Task'
import Component from '@reach/component-component'
import * as ReactDOM from 'react-dom'

type Props = { title: string, tasks: TaskModel[] }

export function TaskList({ title, tasks }: Props) {
  const titleClass = style({
    fontSize: rem(1.5),
    marginBottom: rem(1),
  })
  const tasksClass = style(verticallySpaced(rem(1.5)))
  return (
    <div>
      <div className={titleClass}>{title}</div>
      <Component
        initialState={{ idx: 0 }}
        getRefs={() => ({ container: React.createRef() })}
        didMount={({ refs }) => {
          console.log(
            `ReactDOM.findDOMNode(props.children[0])`,
            ReactDOM.findDOMNode(refs.container.current),
          )
        }}
      >
        {({ refs }) => (
          <div ref={refs.container} className={tasksClass}>
            {tasks.map(task => (
              <Task key={task.id} task={task} />
            ))}
          </div>
        )}
      </Component>
    </div>
  )
}
