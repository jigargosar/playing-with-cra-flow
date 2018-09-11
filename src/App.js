// @flow

import * as React from 'react'
import {Icon} from 'react-icons-kit'
import {home} from 'react-icons-kit/icomoon/home'
import {chevronDown} from 'react-icons-kit/feather'
import {
  getAllTasks,
  getDoneTasks,
  getPendingCategoryTasks,
  getPendingTagTasks,
} from './models/Task'
import {TaskList} from './components/TaskList'
import {Sidebar} from './components/Sidebar'
import {Redirect} from '@reach/router'
import {TagList} from './components/TagList'
import {Route, Router} from './components/Router'
import {
  CollectionConsumer,
  CollectionProvider,
} from './components/CollectionContext'
import {findById} from './models/Collection'
import {style} from 'typestyle'
import {
  flex,
  height,
  horizontal,
  padding,
  scroll,
  someChildWillScroll,
  width,
} from 'csstips'
import {rem, viewHeight, viewWidth} from 'csx'

export const IconHome = () => <Icon size={'100%'} icon={home}/>
export const ChevronDown = () => <Icon size={'100%'} icon={chevronDown}/>

const sizeViewport100 = style(height(viewHeight(100)), width(viewWidth(100)))

const App = () => (
  <CollectionProvider>
    <div className={style(horizontal, sizeViewport100, someChildWillScroll)}>
      <div className={style(scroll)}>
        <Sidebar/>
      </div>
      <div className={style(flex, scroll, padding(0, rem(1)))}>
        <CollectionConsumer>
          {({tasks, tags}) => (
            <Router>
              <Redirect from={'/'} to={'All'}/>
              <Route
                path={'All'}
                render={() => (
                  <TaskList tasks={getAllTasks(tasks)}
                            title={'All Tasks '}/>
                )}
              />
              <Route
                path={'Done'}
                render={() => (
                  <TaskList tasks={getDoneTasks(tasks)}
                            title={'Done Tasks'}/>
                )}
              />
              <TagList path={'Tags'}/>
              <Route
                path={'/:category'}
                render={({category}) => (
                  <TaskList
                    tasks={getPendingCategoryTasks(category, tasks)}
                    title={`${category} Tasks`}
                  />
                )}
              />
              <Route
                path={'/tag/:tagTitle/:tid'}
                render={({tid}) => (
                  <TaskList
                    tasks={getPendingTagTasks(tid, tasks)}
                    title={`#${findById(tid)(tags).title} Tasks`}
                  />
                )}
              />
            </Router>
          )}
        </CollectionConsumer>
      </div>
    </div>
  </CollectionProvider>
)

export default App
