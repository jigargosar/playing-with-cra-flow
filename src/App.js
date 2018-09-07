// @flow

import * as React from 'react'
import { Component } from 'react'
import { Provider } from 'reakit'
import { Icon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon/home'
import { chevronDown } from 'react-icons-kit/feather'
import type { TaskCollection } from './models/Task'
import { generateTaskList } from './models/Task'
import { TaskList } from './components/TaskList'
import { theme } from './components/theme'
import { Sidebar } from './components/Sidebar'
import { Layout } from './components/LayoutFlex'

export const IconHome = () => <Icon size={'100%'} icon={home} />
export const ChevronDown = () => <Icon size={'100%'} icon={chevronDown} />

type AppState = { tasks: TaskCollection }

class App extends Component<{}, AppState> {
  state: AppState = { tasks: generateTaskList() }

  render() {
    return (
      <Provider theme={theme}>
        <Layout>
          <Layout.Middle>
            <Layout.Sidebar>
              <Sidebar />
            </Layout.Sidebar>
            <Layout.Main>
              <TaskList tasks={this.state.tasks} />
            </Layout.Main>
          </Layout.Middle>
        </Layout>
      </Provider>
    )
  }
}

export default App
