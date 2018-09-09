// @flow

import * as React from 'react'
import { Provider } from 'reakit'
import { Icon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon/home'
import { chevronDown } from 'react-icons-kit/feather'
import { getAllTasks, getDoneTasks, getPendingCategoryTasks, getPendingTagTasks } from './models/Task'
import { TaskList } from './components/TaskList'
import { theme } from './components/theme'
import { Sidebar } from './components/Sidebar'
import { AppLayout } from './components/AppLayout'
import { Redirect } from '@reach/router'
import { TagList } from './components/TagList'
import { Route, Router } from './components/Router'
import { CollectionConsumer, CollectionProvider } from './components/CollectionContext'

export const IconHome = () => <Icon size={'100%'} icon={home} />
export const ChevronDown = () => <Icon size={'100%'} icon={chevronDown} />

const App = () => (
  <Provider theme={theme}>
    <CollectionProvider>
      <CollectionConsumer>
        {({ tasks, tags }) => (
          <AppLayout>
            <AppLayout.Middle>
              <AppLayout.Sidebar>
                <Sidebar />
              </AppLayout.Sidebar>
              <AppLayout.Main>
                <Router>
                  <Redirect from={'/'} to={'All'} />
                  <Route
                    path={'All'}
                    render={() => (
                      <TaskList
                        tasks={getAllTasks(tasks)}
                        title={'All Tasks '}
                      />
                    )}
                  />
                  <Route
                    path={'Done'}
                    render={() => (
                      <TaskList
                        tasks={getDoneTasks(tasks)}
                        title={'Done Tasks'}
                      />
                    )}
                  />
                  <TagList path={'Tags'} tags={tags} />
                  <Route
                    path={'/:category'}
                    render={({ category }) => (
                      <TaskList
                        tasks={getPendingCategoryTasks(category, tasks)}
                        title={`${category} Tasks`}
                      />
                    )}
                  />
                  <Route
                    path={'/tag/:tagTitle/:tid'}
                    render={({ tid }) => (
                      <TaskList
                        tasks={getPendingTagTasks(tid, tasks)}
                        title={`${'Tag'} Tasks`}
                      />
                    )}
                  />
                </Router>
              </AppLayout.Main>
            </AppLayout.Middle>
          </AppLayout>
        )}
      </CollectionConsumer>
    </CollectionProvider>
  </Provider>
)

export default App
