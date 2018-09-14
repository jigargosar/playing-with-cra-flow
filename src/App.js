// @flow

import * as React from 'react'
import { Fragment } from 'react'
import { activePred, donePred, filterTasks } from './models/Task'
import { Sidebar } from './components/Sidebar'
import { TagList } from './components/TagList'
import { Router } from './components/Router'
import {
  CollectionConsumer,
  CollectionProvider,
} from './components/CollectionContext'
import { flex, horizontal, padding, scroll, someChildWillScroll } from 'csstips'
import { rem } from 'csx'
import { findById } from './models/Collection'
import { style } from './typestyle-exports'
import { bg, gray, sizeViewport100 } from './styles'
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
import { allPass } from 'ramda'
import { Error } from './components/Error'

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

function TagsTaskList({ tid, tagTitle, tags, ...otherProps }) {
  const tag = findById(tid)(tags)
  return tag.matchWith({
    Just: ({ value: tag }) => (
      <FilteredTaskList
        title={`${tag.title}`}
        pred={allPass([activePred, t => t.tagIds.includes(tid)])}
        {...otherProps}
      />
    ),
    Nothing: () => (
      <Error message={`Tag "${tagTitle}" not found. (id:${tid})`} />
    ),
  })
}

TagsTaskList.defaultProps = {
  tid: '',
  tagTitle: '',
}

function renderMainRoutes() {
  return (
    <CollectionConsumer>
      {({ tasks, tags }) => (
        <Router className={routerClass}>
          <Redirect from={'/'} to={'All'} noThrow />
          <TagList path={'Tags'} />
          <TaskList default path={'All'} {...{ title: 'All Tasks', tasks }} />
          <FilteredTaskList
            path={'Done'}
            title="Done Tasks"
            pred={donePred}
            tasks={tasks}
          />
          <CategoryTaskList path={'category/:category'} tasks={tasks} />
          <TagsTaskList path={'tag/:tagTitle/:tid'} tags={tags} tasks={tasks} />
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

const routerClass = style(padding(rem(2), rem(1)), bg('#fff'), {
  minHeight: '100%',
})

const AllProviders = nest(
  CollectionProvider,
  EditTaskDialogStateProvider,
  MoveTaskDialogStateProvider,
)

const App = () => (
  <AllProviders>
    <Fragment>
      <div className={containerClass}>
        <div className={sidebarClass}>
          <Sidebar />
        </div>
        <div className={contentClass}>{renderMainRoutes()}</div>
      </div>
      <EditTaskDialog />
      <MoveTaskDialog />
    </Fragment>
  </AllProviders>
)

export default App
