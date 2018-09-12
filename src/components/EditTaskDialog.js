import type { TaskModel } from '../models/Task'
import Component from '@reach/component-component'
import * as React from 'react'
import { Fragment } from 'react'
import { Dialog } from '@reach/dialog'
import { CollectionConsumer } from './CollectionContext'
import { rem, style, vertical, verticallySpaced } from '../typestyle-exports'

type Props = {
  onDismiss: () => void,
  task: TaskModel,
}

export function EditTaskDialog({ onDismiss, task }: Props) {
  return (
    <Component getRefs={() => ({ title: React.createRef() })}>
      {({ refs }) => (
        <Dialog
          className={style(verticallySpaced(rem(1)))}
          onDismiss={onDismiss}
        >
          <h2>Edit Task</h2>
          <div className={style(vertical)}>
            <input ref={refs.title} type={'text'} defaultValue={task.title} />
          </div>
          <CollectionConsumer>
            {({ updateTask }) => (
              <button
                onClick={() => {
                  updateTask({ title: refs.title.current.value }, task)
                  onDismiss()
                }}
              >
                Ok
              </button>
            )}
          </CollectionConsumer>
        </Dialog>
      )}
    </Component>
  )
}

export function renderEditTaskDialogTrigger(render) {
  return (
    <Component initialState={{ showDialog: false, task: null }}>
      {({ state, setState }) => (
        <Fragment>
          {render({
            startEditingTask: task => () =>
              setState({ showDialog: true, task }),
          })}
          {state.showDialog && (
            <EditTaskDialog
              onDismiss={() => setState({ showDialog: false })}
              task={state.task}
            />
          )}
        </Fragment>
      )}
    </Component>
  )
}
