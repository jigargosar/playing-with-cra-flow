// @flow

import * as React from 'react'
import { Provider } from 'reakit'
import { Icon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon/home'
import { chevronDown } from 'react-icons-kit/feather'
import { generateTaskList, getDoneTasks, getPendingCategoryTasks, setSomeTaskTags } from './models/Task'
import { TaskList } from './components/TaskList'
import { theme } from './components/theme'
import { Sidebar } from './components/Sidebar'
import { AppLayout } from './components/AppLayout'
import { generateTagList } from './models/Tag'
import { findById } from './models/Collection'
import { Redirect, Router } from '@reach/router'
import { CategoryTaskList } from './TaskListRoutes'
import { TagsList } from './components/TagsList'
import Component from '@reach/component-component'

export const IconHome = () => <Icon size={'100%'} icon={home} />
export const ChevronDown = () => <Icon size={'100%'} icon={chevronDown} />

const App = () => (
  <Component
    getInitialState={() => {
      const tags = generateTagList()
      const tasks = generateTaskList().map(setSomeTaskTags(tags))
      return { tasks, tags }
    }}
  >
    {({ state: { tasks, tags }, setState, refs }) => {
      const getTaskTags = task => task.tagIds.map(tid => findById(tid)(tags))
      return (
        <Provider theme={theme}>
          <AppLayout>
            <AppLayout.Middle>
              <AppLayout.Sidebar>
                <Sidebar />
              </AppLayout.Sidebar>
              <AppLayout.Main>
                <Router>
                  <Redirect from={'/'} to={'All'} />
                  <TaskList
                    path={'All'}
                    tasks={tasks}
                    getTaskTags={getTaskTags}
                  />
                  <RenderPath
                    path={'All'}
                    render={() => (
                      <TaskList tasks={tasks} getTaskTags={getTaskTags} />
                    )}
                  />
                  <RenderPath
                    path={'Done'}
                    render={() => (
                      <TaskList
                        tasks={getDoneTasks(tasks)}
                        getTaskTags={getTaskTags}
                      />
                    )}
                  />
                  <TagsList path={'Tags'} tags={tags} />
                  <CategoryTaskList
                    path={'/:category'}
                    tasks={tasks}
                    getTaskTags={getTaskTags}
                  />
                  <RenderPath
                    path={'/:category'}
                    render={({ category }) => (
                      <TaskList
                        tasks={getPendingCategoryTasks(category, tasks)}
                        getTaskTags={getTaskTags}
                      />
                    )}
                  />
                </Router>
              </AppLayout.Main>
            </AppLayout.Middle>
          </AppLayout>
        </Provider>
      )
    }}
  </Component>
)
export default App

const RenderPath = ({ render }) => render()
