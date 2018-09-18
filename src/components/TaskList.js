import { style, stylesheet } from 'typestyle/'
import { rem } from 'csx/'
import { verticallySpaced } from 'csstips/'
import { InlineEditTask, Task } from './Task'
import * as React from 'react'
import type { TaskModel } from '../models/Task'
import { createStringValue } from 'react-values'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { relative } from '../styles'

type Props = { title: string, tasks: TaskModel[] }

export const mapRenderFnArgs = fn => Comp => ({ children, ...otherProps }) => (
  <Comp children={props => children(fn(props))} {...otherProps} />
)

const EditingTaskId = mapRenderFnArgs(
  ({ value: editingTaskId, set: setEditingTaskId }) => ({
    editingTaskId,
    setEditingTaskId,
    getTaskKey: task =>
      task.id === editingTaskId
        ? `editing-${task.id}`
        : `not-editing-${task.id}`,
    isEditingTask: task => task.id === editingTaskId,
  }),
)(createStringValue(null))

const duration = 450

const fadeClasses = stylesheet({
  enter: {
    opacity: 0.01,
  },
  enterActive: {
    opacity: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    transition: `opacity ${duration}ms ease-in-out`,
    // transitionDelay: `${duration}ms`,
    zIndex: 1,
  },
  exit: {
    opacity: 1,
  },
  exitActive: {
    opacity: 0.01,
    // transition: `opacity ${duration}ms ease-in`,
    transition: `opacity ${duration}ms ease-in-out`,
  },
})

export const Fade = ({ ...otherProps }) => {
  return (
    <CSSTransition
      classNames={fadeClasses}
      timeout={duration}
      {...otherProps}
    />
  )
}

const tasksContainerClass = style(
  //
  verticallySpaced(rem(1.5)),
  relative,
)

export function TaskList({ title, tasks }: Props) {
  const titleClass = style({
    fontSize: rem(1.5),
    marginBottom: rem(1),
  })
  return (
    <div>
      <div className={titleClass}>{title}</div>
      <EditingTaskId
        children={({ isEditingTask, getTaskKey, setEditingTaskId }) => (
          <div className={tasksContainerClass}>
            {tasks.map(task => (
              <TransitionGroup key={task.id} component={null}>
                <Fade key={getTaskKey(task)}>
                  <div>
                    {!isEditingTask(task) && (
                      <Task
                        task={task}
                        startEditing={() => setEditingTaskId(task.id)}
                      />
                    )}
                    {isEditingTask(task) && (
                      <InlineEditTask
                        dismissEditing={() => setEditingTaskId(null)}
                        task={task}
                      />
                    )}
                  </div>
                </Fade>
              </TransitionGroup>
            ))}
          </div>
        )}
      />
    </div>
  )
}
