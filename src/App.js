// @flow

import * as React from 'react'
import { activePred, donePred, filterTasks } from './models/Task'
import { Sidebar } from './components/Sidebar'
import { TagList } from './components/TagList'
import { Router } from './components/Router'
import {
  CollectionConsumer,
  CollectionProvider,
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
} from './components/EditTaskDialog'
import {
  MoveTaskDialog,
  MoveTaskDialogStateProvider,
} from './components/MoveTaskDialog'
import { nest } from 'recompose'
import { TaskList } from './components/TaskList'
import { ErrorMessage } from './components/ErrorMessage'
import { gray, white } from './colors'
import { allPass } from 'ramda'

function FilteredTaskList({ pred, tasks, ...otherProps }) {
  return <TaskList tasks={filterTasks(pred, tasks)} {...otherProps} />
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

function TagTaskList({ tid, tagTitle, tags, ...otherProps }) {
  return findById(tid)(tags)
    .map(tag => (
      <FilteredTaskList
        title={`${tag.title}`}
        pred={allPass([activePred, t => t.tagIds.includes(tid)])}
        {...otherProps}
      />
    ))
    .getOrElse(
      <ErrorMessage>{`Tag "${tagTitle}" not found. (id:${tid})`}</ErrorMessage>,
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
  return (
    <CollectionConsumer>
      {({ tasks, tags }) => (
        <Router className={routerClass}>
          <Redirect from={'/'} to={'all'} noThrow />
          <TagList path={'tag'} />
          <TaskList path={'all'} {...{ title: 'All Tasks', tasks }} />
          <FilteredTaskList
            path={'done'}
            title="Done Tasks"
            pred={donePred}
            tasks={tasks}
          />
          <CategoryTaskList path={'category/:category'} tasks={tasks} />
          <TagTaskList path={'tag/:tagTitle/:tid'} tags={tags} tasks={tasks} />
          <NotFound default />
        </Router>
      )}
    </CollectionConsumer>
  )
}

const containerClass = style(
  horizontal,
  someChildWillScroll,
  sizeViewport100,
  bg(gray(0.05)),
)
const contentClass = style(flex, scroll)
const sidebarClass = style(scroll, { minWidth: 225 })

const routerClass = style(padding(rem(2), rem(1)), bg(white), {
  minHeight: '100%',
})

const AllProviders = nest(
  CollectionProvider,
  EditTaskDialogStateProvider,
  MoveTaskDialogStateProvider,
)

const App = () => (
  <AllProviders>
    <div className={containerClass}>
      <div className={sidebarClass}>
        <Sidebar />
      </div>
      <div className={contentClass}>{renderMainRoutes()}</div>
    </div>
    <EditTaskDialog />
    <MoveTaskDialog />
  </AllProviders>
)

export default App
