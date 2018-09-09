import type { TaskModel } from '../models/Task'
import Component from '@reach/component-component'
import * as React from 'react'
import { Dialog } from '@reach/dialog'

export function EditTaskDialog({
  onDismiss,
  task,
}: {
  onDismiss: () => void,
  task: TaskModel,
}) {
  return (
    <Component getRefs={() => ({ title: React.createRef() })}>
      {({ refs }) => (
        <Dialog onDismiss={onDismiss}>
          <h2 style={{ marginTop: 0 }}>Edit Task</h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '1rem',
            }}
          >
            <input ref={refs.title} type={'text'} defaultValue={task.title} />
          </div>
          <button onClick={onDismiss}>Ok</button>
        </Dialog>
      )}
    </Component>
  )
}
