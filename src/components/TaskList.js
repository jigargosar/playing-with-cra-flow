import { style } from 'typestyle/'
import { rem } from 'csx/'
import { verticallySpaced } from 'csstips/'
import { InlineEditTask, Task } from './Task'
import * as React from 'react'
import type { TaskModel } from '../models/Task'
import { createStringValue } from 'react-values'
import { Transition, TransitionGroup } from 'react-transition-group'
import { relative } from '../styles'
import { take } from 'ramda'

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

const duration = 2000

const defaultStyle = {
  transition: `opacity ${duration}ms linear`,
  opacity: 1,
}

const transitionStyles = {
  entering: { opacity: 0, top: 0, position: 'absolute', zIndex: 1 },
  exiting: { opacity: 0 },
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
            {take(1, tasks).map(task => (
              <div key={task.id} className={style(relative, { top: 0 })}>
                <TransitionGroup key={task.id} component={null}>
                  {!isEditingTask(task) && (
                    <Transition key={getTaskKey(task)} timeout={duration}>
                      {state => {
                        console.log(`mode display`, state)
                        return (
                          !isEditingTask(task) && (
                            <div
                              style={{
                                ...defaultStyle,
                                ...transitionStyles[state],
                              }}
                            >
                              <Task
                                task={task}
                                startEditing={() => setEditingTaskId(task.id)}
                              />
                            </div>
                          )
                        )
                      }}
                    </Transition>
                  )}
                  {isEditingTask(task) && (
                    <Transition key={getTaskKey(task)} timeout={duration}>
                      {state => {
                        console.log(`mode edit`, state)
                        return (
                          isEditingTask(task) && (
                            <div
                              style={{
                                ...defaultStyle,
                                ...transitionStyles[state],
                              }}
                            >
                              <InlineEditTask
                                dismissEditing={() => setEditingTaskId(null)}
                                task={task}
                              />
                            </div>
                          )
                        )
                      }}
                    </Transition>
                  )}
                </TransitionGroup>
              </div>
            ))}
          </div>
        )}
      />
    </div>
  )
}
