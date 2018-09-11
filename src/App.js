// @flow

import * as React from 'react'
import { Icon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon/home'
import { chevronDown } from 'react-icons-kit/feather'
import { filterTasks, getPendingCategoryTasks } from './models/Task'
import { TaskList } from './components/TaskList'
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

export const IconHome = () => <Icon size={'100%'} icon={home} />
export const ChevronDown = () => <Icon size={'100%'} icon={chevronDown} />

const sizeViewport100 = style(height(viewHeight(100)), width(viewWidth(100)))

const donePred = t => t.done
const activePred = t => !t.done
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

const App = () => (
  <CollectionProvider>
    <div className={style(horizontal, sizeViewport100, someChildWillScroll)}>
      <div className={style(scroll)}>
        <Sidebar />
      </div>
      <div className={style(flex, scroll, padding(0, rem(1)))}>
        <CollectionConsumer>
          {({ tasks, tags }) => (
            <Router>
              <Redirect from={'/'} to={'All'} />
              {taskRouteFilters.map(([path, pred, titleFn]) => (
                <Route
                  key={path}
                  path={path}
                  render={props => (
                    <TaskList
                      tasks={filterTasks(pred(props), tasks)}
                      title={titleFn({ ...props, tags })}
                    />
                  )}
                />
              ))}
              {/*<Route*/}
              {/*path={'All'}*/}
              {/*render={() => (*/}
              {/*<TaskList tasks={getAllTasks(tasks)} title={'All Tasks '} />*/}
              {/*)}*/}
              {/*/>*/}
              {/*<Route*/}
              {/*path={'Done'}*/}
              {/*render={() => (*/}
              {/*<TaskList tasks={getDoneTasks(tasks)} title={'Done Tasks'} />*/}
              {/*)}*/}
              {/*/>*/}
              <TagList path={'Tags'} />
              <Route
                path={'/:category'}
                render={({ category }) => (
                  <TaskList
                    tasks={getPendingCategoryTasks(category, tasks)}
                    title={`${category} Tasks`}
                  />
                )}
              />
              {/*<Route*/}
              {/*path={'/tag/:tagTitle/:tid'}*/}
              {/*render={({ tid }) => (*/}
              {/*<TaskList*/}
              {/*tasks={getPendingTagTasks(tid, tasks)}*/}
              {/*title={`#${findById(tid)(tags).title} Tasks`}*/}
              {/*/>*/}
              {/*)}*/}
              {/*/>*/}
            </Router>
          )}
        </CollectionConsumer>
      </div>
    </div>
  </CollectionProvider>
)

export default App
