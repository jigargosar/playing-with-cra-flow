// @flow

import * as React from 'react'
import { Fragment } from 'react'
import { activePred, donePred, filterTasks } from './models/Task'
import { Sidebar } from './components/Sidebar'
import { TagList } from './components/TagList'
import { Route, Router } from './components/Router'
import {
  CollectionConsumer,
  CollectionProvider,
} from './components/CollectionContext'
import { flex, horizontal, padding, scroll, someChildWillScroll } from 'csstips'
import { rem } from 'csx'
import { findById } from './models/Collection'
import { style } from './typestyle-exports'
import { bg, nearWhiteColor, sizeViewport100 } from './styles'
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
import { allPass, always } from 'ramda'

const taskRouteFilters = [
  [
    'category/:category',
    ({ category }) => allPass([activePred, t => t.category === category]),
    ({ category }) => `${category}`,
  ],
  [
    'tag/:tagTitle/:tid',
    ({ tid }) => allPass([activePred, t => t.tagIds.includes(tid)]),
    ({ tid, tags }) => `#${findById(tid)(tags).title}`,
  ],
]

function FilteredTaskList({ pred, tasks, ...otherProps }) {
  return (
    <TaskList tasks={filterTasks(pred(otherProps), tasks)} {...otherProps} />
  )
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
            pred={always(donePred)}
            tasks={tasks}
          />
          {taskRouteFilters.map(([path, pred, titleFn]) => (
            <Route
              key={path}
              path={path}
              render={props => {
                const pageTitle = titleFn({ ...props, tags })
                const finalTasks = filterTasks(pred(props), tasks)
                return <TaskList {...{ title: pageTitle, tasks: finalTasks }} />
              }}
            />
          ))}
        </Router>
      )}
    </CollectionConsumer>
  )
}

const containerClass = style(
  horizontal,
  someChildWillScroll,
  sizeViewport100,
  bg(nearWhiteColor),
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
