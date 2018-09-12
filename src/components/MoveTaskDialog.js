// @flow
import Component from '@reach/component-component'
import * as React from 'react'
import { Fragment } from 'react'
import { Dialog } from '@reach/dialog'
import { CollectionConsumer } from './CollectionContext'
import {
  content,
  flex,
  horizontal,
  margin,
  rem,
  style,
  vertical,
  verticallySpaced,
  wrap,
} from '../typestyle-exports'
import { noop } from 'ramda-adjunct'
import type { TaskModel } from '../models/Task'
import { storageGet, StorageSet } from './StorageSet'
import type { Category } from '../models/Category'
import { categories } from '../models/Category'
import { tc } from '../styles'

const { Provider, Consumer } = React.createContext({
  onDismiss: noop,
  isOpen: false,
  title: '',
  category: '',
  startEditingTask: noop,
  onCategoryClick: (category: Category) => () => noop(category),
})

export function MoveTaskDialog() {
  return (
    <Consumer>
      {({
          onDismiss,
          isOpen,
          title,
          category: currentCategory,
          onCategoryClick,
        }) =>
        isOpen && (
          <Dialog
            className={style(verticallySpaced(rem(1)))}
            onDismiss={onDismiss}
            isOpen={isOpen}
          >
            <h3>Move Task</h3>
            <div className={style(vertical)}>{title}</div>
            <div className={style(horizontal, wrap)}>
              {categories.map(category => (
                <button
                  disabled={currentCategory === category}
                  onClick={onCategoryClick(category)}
                  key={category}
                  className={style(
                    //
                    margin('0.5rem'),
                    tc,
                    content,
                    flex,
                    { width: '30%' },
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </Dialog>
        )
      }
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
  const defaultState = { isOpen: false, task: {} }
  return (
    <Component getInitialState={() => storageGet(stateName, defaultState)}>
      {({ state, setState }) => (
        <CollectionConsumer>
          {({ updateTask }) => {
            const { task, isOpen } = state
            const onDismiss = () => setState({ isOpen: false })
            const startEditingTask = task => () =>
              setState({ isOpen: true, task })
            const onCategoryClick = category => () => {
              updateTask({ category }, task)
              onDismiss()
            }
            const childProps = {
              onDismiss,
              isOpen,
              title: task.title,
              category: task.category,
              startEditingTask,
              onCategoryClick,
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
