// @flow
import Component from '@reach/component-component'
import * as React from 'react'
import { Dialog } from '@reach/dialog'
import { CollectionConsumer } from './CollectionContext'
import { rem, style, vertical, verticallySpaced } from '../typestyle-exports'
import { noop } from 'ramda-adjunct'

function storageGet(key, defaultState) {
  const storedState = localStorage.getItem(key)
  const parseState = storedState && JSON.parse(storedState)
  return parseState ? parseState : defaultState
}

function StorageSet({ name, value }: { name: string, value: any }) {
  const didMountOrUpdate = ({ props: { name, value } }) => {
    localStorage.setItem(name, JSON.stringify(value))
  }
  return (
    <Component
      name={name}
      value={value}
      didMount={didMountOrUpdate}
      didUpdate={didMountOrUpdate}
    />
  )
}

const { Provider, Consumer } = React.createContext({
  onDismiss: noop,
  isOpen: false,
  title: '',
  onTitleChange: noop,
  onOk: noop,
  startEditingTask: noop,
})

function renderETD() {
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

export function renderEditTaskDialogTrigger(render: any => any) {
  const stateName = 'editTaskState'
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
            return (
              <Provider
                value={{
                  onDismiss,
                  isOpen,
                  title,
                  onTitleChange,
                  onOk,
                  startEditingTask,
                }}
              >
                <StorageSet name={stateName} value={state} />
                {render({ startEditingTask })}
                {renderETD()}
              </Provider>
            )
          }}
        </CollectionConsumer>
      )}
    </Component>
  )
}
