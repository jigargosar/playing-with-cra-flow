// @flow

import * as React from 'react'
import { Component } from 'react'
import { Provider } from 'reakit'
import { Icon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon/home'
import { chevronDown } from 'react-icons-kit/feather'
import { theme } from './components/theme'
import { Layout } from './components/Layout'
import type { TaskCollection } from './models/Task'
import { createTaskList } from './models/Task'
import { TaskList } from './components/TaskList'

export const IconHome = () => <Icon size={'100%'} icon={home} />
export const ChevronDown = () => <Icon size={'100%'} icon={chevronDown} />

type AppState = {tasks:TaskCollection}

class App extends Component<{}, AppState> {
  state: AppState = {tasks:createTaskList()}

  render() {
    return (
      <Provider theme={theme}>
        <Layout>
          <Layout.Content>
            <TaskList tasks={this.state.tasks}/>
          </Layout.Content>
        </Layout>
      </Provider>
    )
  }
}

export default App
