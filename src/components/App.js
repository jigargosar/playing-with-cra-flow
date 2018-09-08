import * as React from 'react'
import Component from '@reach/component-component'
import { theme } from './theme'
import { Provider } from 'reakit'
import { AppLayout } from './AppLayout'
import { Sidebar } from './Sidebar'
import { Redirect, Router } from '@reach/router'
import { TaskList } from './TaskList'
import { CategoryTaskList, DoneTaskList } from '../TaskListRoutes'
import { TagsList } from './TagsList'
import { findById } from '../models/Collection'

export const AppComponent = () => (
  <Component
    getInitialState={() => {
      return {
        tasks: [],
        tags: [],
      }
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
                  <DoneTaskList
                    path={'Done'}
                    tasks={tasks}
                    getTaskTags={getTaskTags}
                  />
                  <TagsList path={'Tags'} tags={tags} />
                  <CategoryTaskList
                    path={'/:category'}
                    tasks={tasks}
                    getTaskTags={getTaskTags}
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
