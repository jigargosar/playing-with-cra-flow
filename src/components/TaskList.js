import { style } from 'typestyle/'
import { rem } from 'csx/'
import { verticallySpaced } from 'csstips/'
import { InlineEditTask, Task } from './Task'
import * as React from 'react'
import type { TaskModel } from '../models/Task'
import { createStringValue } from 'react-values'
import { Transition, TransitionGroup } from 'react-transition-group'
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

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in`,
  opacity: 1,
  position: 'relative',
  top: 0,
}

const transitionStyles = {
  entering: { opacity: 0, position: 'absolute', zIndex: 1 },
  entered: {
    opacity: 1,
    position: 'relative',
    transition: `opacity ${duration}ms ease-in`,
  },
  // exiting: { opacity: 1 },
  // exited: { opacity: 0 },
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
              <div key={task.id}>
                <TransitionGroup>
                  <Transition key={getTaskKey(task)} timeout={duration}>
                    {state => {
                      console.log(`state`, state)
                      return (
                        <div
                          style={{
                            ...defaultStyle,
                            ...transitionStyles[state],
                          }}
                        >
                          {isEditingTask(task) ? (
                            <InlineEditTask
                              dismissEditing={() => setEditingTaskId(null)}
                              task={task}
                            />
                          ) : (
                            <Task
                              task={task}
                              startEditing={() => setEditingTaskId(task.id)}
                            />
                          )}
                        </div>
                      )
                    }}
                  </Transition>
                </TransitionGroup>
              </div>
            ))}
          </div>
        )}
      />
    </div>
  )
}
