// @flow

import * as React from 'react'
import { activePred, donePred, filterTasks } from './models/Task'
import { Sidebar } from './components/Sidebar'
import { TagList } from './components/TagList'
import { Router } from './components/Router'
import {
  CollectionProvider,
  renderWithCollections,
} from './components/CollectionContext'
import {
  flex,
  horizontal,
  padding,
  scroll,
  someChildWillScroll,
} from 'csstips/lib'
import { rem } from 'csx/lib'
import { findById } from './models/Collection'
import { style } from './typestyle-exports'
import { bg, sizeViewport100 } from './styles'
import { Redirect } from '@reach/router'
import {
  EditTaskDialog,
  EditTaskDialogStateProvider,
  isEditTaskDialogOpen,
} from './components/EditTaskDialog'
import {
  MoveTaskDialog,
  MoveTaskDialogStateProvider,
} from './components/MoveTaskDialog'
import { nest } from 'recompose'
import { TaskList } from './components/TaskList'
import { ErrorMessage } from './components/ErrorMessage'
import { gray, white } from './colors'
import { allPass, T } from 'ramda'
import FocusTrap from 'focus-trap-react'

function FilteredTaskList({ pred, ...otherProps }) {
  return renderWithCollections(({ tasks }) => (
    <TaskList tasks={filterTasks(pred, tasks)} {...otherProps} />
  ))
}

function CategoryTaskList({ category, ...otherProps }) {
  return (
    <FilteredTaskList
      title={`${category}`}
      pred={allPass([activePred, t => t.category === category])}
      {...otherProps}
    />
  )
}

CategoryTaskList.defaultProps = {
  category: 'InBasket',
}

function TagTaskList({ tid, tagTitle, ...otherProps }) {
  return renderWithCollections(({ tags }) =>
    findById(tid)(tags)
      .map(tag => (
        <FilteredTaskList
          title={`${tag.title}`}
          pred={allPass([activePred, t => t.tagIds.includes(tid)])}
          {...otherProps}
        />
      ))
      .getOrElse(
        <ErrorMessage
        >{`Tag "${tagTitle}" not found. (id:${tid})`}</ErrorMessage>,
      ),
  )
}

TagTaskList.defaultProps = {
  tid: '',
  tagTitle: '',
}

function NotFound() {
  return <ErrorMessage>404</ErrorMessage>
}

function renderMainRoutes() {
  const routerClass = style(padding(rem(2), rem(1)), bg(white), {
    minHeight: '100%',
  })

  return (
    <Router className={routerClass}>
      <Redirect from={'/'} to={'all'} noThrow />
      <TagList path={'tag'} />
      <FilteredTaskList path={'all'} title={'All Tasks'} pred={T} />
      <FilteredTaskList path={'done'} title="Done Tasks" pred={donePred} />
      <CategoryTaskList path={'category/:category'} />
      <TagTaskList path={'tag/:tagTitle/:tid'} />
      <NotFound default />
    </Router>
  )
}

const AllProviders = nest(
  CollectionProvider,
  EditTaskDialogStateProvider,
  MoveTaskDialogStateProvider,
)

const App = () => {
  const containerClass = style(
    horizontal,
    someChildWillScroll,
    sizeViewport100,
    bg(gray(0.05)),
  )
  const contentClass = style(flex, scroll)
  const sidebarClass = style(scroll, { minWidth: 225 })

  return (
    <AllProviders>
      {isEditTaskDialogOpen(isOpen => (
        <FocusTrap
          paused={isOpen}
          tag={'div'}
          className={containerClass}
          focusTrapOptions={{
            escapeDeactivates: false,
            onActivate: () => console.log('onActivate'),
            onDeactivate: () => console.log('onDeactivate'),
          }}
        >
          <div className={sidebarClass}>
            <Sidebar />
          </div>
          <div className={contentClass}>{renderMainRoutes()}</div>
          <EditTaskDialog />
          <MoveTaskDialog />
        </FocusTrap>
      ))}
    </AllProviders>
  )
}

export default App
