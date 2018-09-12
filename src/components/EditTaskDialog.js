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
      initialState={{ showDialog: false, task: {} }}
      didMount={({ state, setState }) => {
        const storedState = localStorage.getItem('editTaskState')
        const parseState = storedState && JSON.parse(storedState)
        if (parseState) {
          setState(parseState)
        } else {
          localStorage.setItem('editTaskState', JSON.stringify(state))
        }
      }}
      didUpdate={({ state }) => {
        localStorage.setItem('editTaskState', JSON.stringify(state))
      }}
      getRefs={() => ({ title: React.createRef() })}
    >
      {({ state: { task, showDialog }, setState, refs }) => {
        const onDismiss = () => setState({ showDialog: false })
        return (
          <Fragment>
            {render({
              startEditingTask: task => () =>
                setState({ showDialog: true, task }),
            })}
            {
              <Dialog
                className={style(verticallySpaced(rem(1)))}
                onDismiss={onDismiss}
                isOpen={showDialog}
              >
                <h2>Edit Task </h2>
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
                        updateTask({ title: refs.title.current.value }, task)
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
