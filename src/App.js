// @flow

import * as React from 'react'
import { Icon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon/home'
import { chevronDown } from 'react-icons-kit/feather'
import { activePred, donePred, filterTasks } from './models/Task'
import { Sidebar } from './components/Sidebar'
import { Redirect } from '@reach/router'
import { TagList } from './components/TagList'
import { Route, Router } from './components/Router'
import {
  CollectionConsumer,
  CollectionProvider,
} from './components/CollectionContext'
import { style } from 'typestyle'
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
import { extend, verticallySpaced } from './typestyle'
import { Task } from './components/Task'

export const IconHome = () => <Icon size={'100%'} icon={home} />
export const ChevronDown = () => <Icon size={'100%'} icon={chevronDown} />

const sizeViewport100 = extend(height(viewHeight(100)), width(viewWidth(100)))

const taskRouteFilters = [
  ['All', props => () => true, props => 'All Tasks'],
  ['Done', props => donePred, props => 'Completed Tasks'],
  [
    ':category',
    ({ category }) => allPass([activePred, t => t.category === category]),
    ({ category }) => `${category} Tasks`,
  ],
  [
    'tag/:tagTitle/:tid',
    ({ tid }) => allPass([activePred, t => t.tagIds.includes(tid)]),
    ({ tid, tags }) => `#${findById(tid)(tags).title}`,
  ],
]

const containerClass = style(horizontal, someChildWillScroll, sizeViewport100)
const contentClass = style(flex, scroll)
const sidebarClass = style(scroll, { minWidth: 225 })

const App = () => (
  <CollectionProvider>
    <div className={containerClass}>
      <div className={sidebarClass}>
        <Sidebar />
      </div>
      <div className={contentClass}>
        <CollectionConsumer>
          {({ tasks, tags }) => (
            <Router className={style(padding(rem(1)))}>
              <Redirect from={'/'} to={'All'} />
              {taskRouteFilters.map(([path, pred, titleFn]) => (
                <Route
                  key={path}
                  path={path}
                  render={props => (
                    <div>
                      <h2>{titleFn({ ...props, tags })}</h2>
                      <div className={style(verticallySpaced(rem(1.5)))}>
                        {filterTasks(pred(props), tasks).map(task => (
                          <Task key={task.id} task={task} />
                        ))}
                      </div>
                    </div>
                  )}
                />
              ))}
              <TagList path={'Tags'} />
            </Router>
          )}
        </CollectionConsumer>
      </div>
    </div>
  </CollectionProvider>
)

export default App
