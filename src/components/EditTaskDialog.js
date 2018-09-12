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

export function renderEditTaskDialogTrigger(render: any => any) {
  return (
    <Component
      getInitialState={() =>
        storageGet('editTaskState', {
          showDialog: false,
          task: {},
          title: '',
        })
      }
    >
      {({ state, setState }) => {
        const onDismiss = () => setState({ showDialog: false })
        const { task, showDialog, title } = state
        return (
          <Fragment>
            <Component
              key={'editTaskState'}
              value={state}
              didMount={({ props: { key, value } }) => {
                localStorage.setItem(key, JSON.stringify(value))
              }}
              didUpdate={({ props: { key, value } }) => {
                localStorage.setItem(key, JSON.stringify(value))
              }}
            />
            {render({
              startEditingTask: task => () =>
                setState({ showDialog: true, task, title: task.title }),
            })}
            {
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
                    onChange={e => setState({ title: e.target.value })}
                  />
                </div>
                <CollectionConsumer>
                  {({ updateTask }) => (
                    <button
                      onClick={() => {
                        updateTask({ title }, task)
                        onDismiss()
                      }}
                    >
                      Ok
                    </button>
                  )}
                </CollectionConsumer>
              </Dialog>
            }
          </Fragment>
        )
      }}
    </Component>
  )
}
