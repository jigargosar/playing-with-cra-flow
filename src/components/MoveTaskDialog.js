// @flow
import * as React from 'react'
import { Dialog } from '@reach/dialog'
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
