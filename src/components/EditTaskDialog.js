// @flow
import Component from '@reach/component-component'
import * as React from 'react'
import { Fragment } from 'react'
import { Dialog } from '@reach/dialog'
import { CollectionConsumer } from './CollectionContext'
import { rem, style, vertical, verticallySpaced } from '../typestyle-exports'

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

export function renderEditTaskDialogTrigger(render: any => any) {
  const stateName = 'editTaskState'
  return (
    <Component
      getInitialState={() =>
        storageGet(stateName, {
          showDialog: false,
          task: {},
          title: '',
        })
      }
    >
      {({ state, setState }) => (
        <CollectionConsumer>
          {({ updateTask }) => {
            {
              const { task, showDialog, title } = state
              const onDismiss = () => setState({ showDialog: false })
              const startEditingTask = task => () =>
                setState({ showDialog: true, task, title: task.title })
              const onOk = () => {
                updateTask({ title }, task)
                onDismiss()
              }
              const onTitleChange = e => setState({ title: e.target.value })
              return (
                <Fragment>
                  <StorageSet name={stateName} value={state} />
                  {render({ startEditingTask })}
                  <Dialog
                    className={style(verticallySpaced(rem(1)))}
                    onDismiss={onDismiss}
                    isOpen={showDialog}
                  >
                    <h3>Edit Task </h3>
                    <div className={style(vertical)}>
                      <input
                        type={'text'}
                        value={title}
                        onChange={onTitleChange}
                      />
                    </div>
                    <button onClick={onOk}>Ok</button>
                  </Dialog>
                </Fragment>
              )
            }
          }}
        </CollectionConsumer>
      )}
    </Component>
  )
}
