// @flow
import Component from '@reach/component-component'
import * as React from 'react'
import { Fragment } from 'react'
import { Dialog } from '@reach/dialog'
import { CollectionConsumer } from './CollectionContext'
import { rem, style, vertical, verticallySpaced } from '../typestyle-exports'
import { noop } from 'ramda-adjunct'
import type { TaskModel } from '../models/Task'
import { storageGet, StorageSet } from './StorageSet'

const { Provider, Consumer } = React.createContext({
  onDismiss: noop,
  isOpen: false,
  title: '',
  onTitleChange: noop,
  onOk: noop,
  startEditingTask: noop,
})

export function MoveTaskDialog() {
  return (
    <Consumer>
      {({ onDismiss, isOpen, title, onTitleChange, onOk }) => (
        <Dialog
          className={style(verticallySpaced(rem(1)))}
          onDismiss={onDismiss}
          isOpen={isOpen}
        >
          <h3>Edit Task </h3>
          <div className={style(vertical)}>
            <input type={'text'} value={title} onChange={onTitleChange} />
          </div>
          <button onClick={onOk}>Ok</button>
        </Dialog>
      )}
    </Consumer>
  )
}

export function showMoveTaskDialog(task: TaskModel, render: Function) {
  return (
    <Consumer>
      {({ startEditingTask }) => render(startEditingTask(task))}
    </Consumer>
  )
}

export function MoveTaskDialogStateProvider({ children }: { children: any }) {
  const stateName = 'moveTaskState'
  const defaultState = { isOpen: false, task: {}, title: '' }
  return (
    <Component getInitialState={() => storageGet(stateName, defaultState)}>
      {({ state, setState }) => (
        <CollectionConsumer>
          {({ updateTask }) => {
            const { task, isOpen, title } = state
            const onDismiss = () => setState({ isOpen: false })
            const startEditingTask = task => () =>
              setState({ isOpen: true, task, title: task.title })
            const onOk = () => {
              updateTask({ title }, task)
              onDismiss()
            }
            const onTitleChange = e => setState({ title: e.target.value })
            const childProps = {
              onDismiss,
              isOpen,
              title,
              onTitleChange,
              onOk,
              startEditingTask,
            }
            return (
              <Fragment>
                <StorageSet name={stateName} value={state} />
                <Provider value={childProps}>{children}</Provider>
              </Fragment>
            )
          }}
        </CollectionConsumer>
      )}
    </Component>
  )
}
