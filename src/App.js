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
    return (
      <Provider theme={theme}>
        <AppLayout>
          <AppLayout.Middle>
            <AppLayout.Sidebar>
              <Sidebar />
            </AppLayout.Sidebar>
            <AppLayout.Main>
              <TaskList tasks={this.state.tasks} />
            </AppLayout.Main>
          </AppLayout.Middle>
        </AppLayout>
      </Provider>
    )
  }
}

export default App
