// @flow

import * as React from 'react'
import { Component } from 'react'
import { Provider } from 'reakit'
import { Icon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon/home'
import { chevronDown } from 'react-icons-kit/feather'
import type { TaskCollection } from './models/Task'
import { generateTaskList, setSomeTaskTags } from './models/Task'
import { TaskList } from './components/TaskList'
import { theme } from './components/theme'
import { Sidebar } from './components/Sidebar'
import { AppLayout } from './components/AppLayout'
import type { TagCollection } from './models/Tag'
import { generateTagList } from './models/Tag'
import { findById } from './models/Collection'
import { Router } from '@reach/router'

export const IconHome = () => <Icon size={'100%'} icon={home} />
export const ChevronDown = () => <Icon size={'100%'} icon={chevronDown} />

type AppState = { tasks: TaskCollection, tags: TagCollection }

class App extends Component<{}, AppState> {
  state: AppState = { tasks: [], tags: [] }

  componentDidMount() {
    const tags = generateTagList()
    const tasks = generateTaskList().map(setSomeTaskTags(tags))
    this.setState({ tasks, tags })
  }

  render() {
    const tags = this.state.tags
    const tasks = this.state.tasks
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
                <TaskList path={'/'} tasks={tasks} getTaskTags={getTaskTags} />
                <TaskList
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
  }
}

export default App
