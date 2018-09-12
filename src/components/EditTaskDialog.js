// @flow
import Component from '@reach/component-component'
import * as React from 'react'
import { Fragment } from 'react'
import { Dialog } from '@reach/dialog'
import { CollectionConsumer } from './CollectionContext'
import { rem, style, vertical, verticallySpaced } from '../typestyle-exports'

export function renderEditTaskDialogTrigger(render: any => any) {
  return (
    <Component
      initialState={{ showDialog: false, task: null }}
      didMount={({ state, setState }) => {
        const storedState = localStorage.getItem('editTaskState')
        if (storedState) {
          setState(JSON.parse(storedState))
        } else {
          localStorage.setItem('editTaskState', JSON.stringify(state))
        }
      }}
      didUpdate={({ state }) => {
        localStorage.setItem('editTaskState', JSON.stringify(state))
      }}
    >
      {({ state, setState }) => {
        const onDismiss = () => setState({ showDialog: false })
        const task = state.task
        const showDialog = state.showDialog
        return (
          <Fragment>
            {render({
              startEditingTask: task => () =>
                setState({ showDialog: true, task }),
            })}
            {showDialog && (
              <Component getRefs={() => ({ title: React.createRef() })}>
                {({ refs }) => (
                  <Dialog
                    className={style(verticallySpaced(rem(1)))}
                    onDismiss={onDismiss}
                  >
                    <h2>Edit 1 Task</h2>
                    <div className={style(vertical)}>
                      <input
                        ref={refs.title}
                        type={'text'}
                        defaultValue={task.title}
                      />
                    </div>
                    <CollectionConsumer>
                      {({ updateTask }) => (
                        <button
                          onClick={() => {
                            updateTask(
                              { title: refs.title.current.value },
                              task,
                            )
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
            )}
          </Fragment>
        )
      }}
    </Component>
  )
}
