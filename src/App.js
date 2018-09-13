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
import {
  flex,
  height,
  horizontal,
  padding,
  scroll,
  someChildWillScroll,
  width,
} from 'csstips'
import { rem, viewHeight, viewWidth } from 'csx'
import { allPass } from 'ramda'
import { findById } from './models/Collection'
import { extend, style } from './typestyle-exports'
import { bg, nearWhiteColor } from './styles'
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

const sizeViewport100 = extend(height(viewHeight(100)), width(viewWidth(100)))

const taskRouteFilters = [
  ['All', props => () => true, props => 'All Tasks'],
  ['Done', props => donePred, props => 'Completed Tasks'],
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

function renderMainRouter() {
  return (
    <CollectionConsumer>
      {({ tasks, tags }) => (
        <Router className={routerClass}>
          <Redirect from={'/'} to={'All'} />
          {taskRouteFilters.map(([path, pred, titleFn]) => {
            return (
              <Route
                key={path}
                path={path}
                render={props => {
                  const pageTitle = titleFn({ ...props, tags })
                  const finalTasks = filterTasks(pred(props), tasks)
                  return (
                    <TaskList {...{ title: pageTitle, tasks: finalTasks }} />
                  )
                }}
              />
            )
          })}
          <TagList path={'Tags'} />
        </Router>
      )}
    </CollectionConsumer>
  )
}

const App = () => (
  <AllProviders>
    <Fragment>
      <div className={containerClass}>
        <div className={sidebarClass}>
          <Sidebar />
        </div>
        <div className={contentClass}>{renderMainRouter()}</div>
      </div>
      <EditTaskDialog />
      <MoveTaskDialog />
    </Fragment>
  </AllProviders>
)

export default App
