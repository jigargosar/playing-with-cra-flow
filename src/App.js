// @flow

import * as React from 'react'
import { Provider } from 'reakit'
import { Icon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon/home'
import { chevronDown } from 'react-icons-kit/feather'
import {
  generateTaskList,
  getAllTasks,
  getDoneTasks,
  getPendingCategoryTasks,
  getPendingTagTasks,
  setSomeTaskTags,
} from './models/Task'
import { TaskList } from './components/TaskList'
import { theme } from './components/theme'
import { Sidebar } from './components/Sidebar'
import { AppLayout } from './components/AppLayout'
import { generateTagList } from './models/Tag'
import { Redirect } from '@reach/router'
import { TagList } from './components/TagList'
import Component from '@reach/component-component'
import { Route, Router } from './components/Router'

export const IconHome = () => <Icon size={'100%'} icon={home} />
export const ChevronDown = () => <Icon size={'100%'} icon={chevronDown} />

export const CollectionContext = React.createContext({ tasks: [], tags: [] })
export const CollectionsConsumer = CollectionContext.Consumer

const App = () => (
  <Provider theme={theme}>
    <CollectionsProvider>
      <CollectionsConsumer>
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
      </CollectionsConsumer>
    </CollectionsProvider>
  </Provider>
)

export default App

const CollectionsProvider = ({ children }) => (
  <Component
    getInitialState={() => {
      // localStorage.removeItem('collections')
      const state = localStorage.getItem('collections')
      if (state) {
        return JSON.parse(state)
      } else {
        const tags = generateTagList()
        const tasks = generateTaskList().map(setSomeTaskTags(tags))
        return { tasks, tags }
      }
    }}
    didUpdate={({ state }) => {
      localStorage.setItem('collections', JSON.stringify(state))
    }}
    didMount={({ state }) => {
      localStorage.setItem('collections', JSON.stringify(state))
    }}
  >
    {({ state: { tasks, tags } }) => {
      return (
        <CollectionContext.Provider value={{ tasks, tags }}>
          {children}
        </CollectionContext.Provider>
      )
    }}
  </Component>
)
