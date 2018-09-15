// @flow
import * as React from 'react'
import { Fragment } from 'react'
import { Dialog } from '@reach/dialog/'
import { renderWithCollections } from './CollectionContext'
import { rem, style, vertical, verticallySpaced } from '../typestyle-exports'
import { noop } from 'ramda-adjunct/'
import { storageGet, StorageSet } from './StorageSet'
import { categories } from '../models/Category'
import type { TaskModel } from '../models/Task'
import Component from '@reach/component-component'

const { Provider, Consumer } = React.createContext({
  onDismiss: noop,
  isOpen: false,
  title: '',
  onTitleChange: noop,
  onOk: noop,
  startEditingTask: noop,
  category: 'InBasket',
  onCategoryChange: noop,
})

type ModalProps = { trigger: Function }

export function EditTaskModal({ trigger }: ModalProps) {
  return (
    <Component>
      {({ state: { isOpen }, setState }) => (
        <Fragment>
          {trigger({ handleOpen: setState({ isOpen: true }) })}
          {isOpen && (
            <Dialog isOpen={true}>
              <h1>Dialog</h1>
            </Dialog>
          )}
        </Fragment>
      )}
    </Component>
  )
}

export function EditTaskDialog() {
  return (
    <Consumer>
      {({
        onDismiss,
        isOpen,
        title,
        category,
        onTitleChange,
        onCategoryChange,
        onOk,
      }) => (
        <Dialog
          className={style(verticallySpaced(rem(1)))}
          onDismiss={onDismiss}
          isOpen={isOpen}
        >
          <h3>Edit Task </h3>
          <div className={style(vertical)}>
            <input type={'text'} value={title} onChange={onTitleChange} />
          </div>
          <div className={style(vertical)}>
            <select value={category} onChange={onCategoryChange}>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button onClick={onOk}>Ok</button>
          </div>
        </Dialog>
      )}
    </Consumer>
  )
}

export function showEditTaskDialog(task: TaskModel, render: Function) {
  return (
    <Consumer>
      {({ startEditingTask }) => render(startEditingTask(task))}
    </Consumer>
  )
}

export function EditTaskDialogStateProvider({ children }: { children: any }) {
  const stateName = 'editTaskState'
  const defaultState = { isOpen: false, task: {}, title: '', category: '' }
  return (
    <Component getInitialState={() => storageGet(stateName, defaultState)}>
      {({ state, setState }) =>
        renderWithCollections(({ updateTask }) => {
          const { task, isOpen, title, category } = state
          const onDismiss = () => setState({ isOpen: false })
          const startEditingTask = task => () =>
            setState({
              isOpen: true,
              task,
              title: task.title,
              category: task.category,
            })
          const onOk = () => {
            updateTask({ title, category }, task)
            onDismiss()
          }
          const onTitleChange = e => setState({ title: e.target.value })
          const onCategoryChange = e => setState({ category: e.target.value })
          const childProps = {
            onDismiss,
            isOpen,
            title,
            onTitleChange,
            onCategoryChange,
            onOk,
            startEditingTask,
            category,
          }
          return (
            <Fragment>
              <StorageSet name={stateName} value={state} />
              <Provider value={childProps}>{children}</Provider>
            </Fragment>
          )
        })
      }
    </Component>
  )
}
