import type { TaskModel } from '../models/Task'
import Component from '@reach/component-component'
import * as React from 'react'
import { Dialog } from '@reach/dialog'
import { CollectionConsumer } from './CollectionContext'
import { rem, style, vertical, verticallySpaced } from '../typestyle'

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
