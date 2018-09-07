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

export const IconHome = () => <Icon size={'100%'} icon={home} />
export const ChevronDown = () => <Icon size={'100%'} icon={chevronDown} />

type AppState = { tasks: TaskCollection }

class App extends Component<{}, AppState> {
  state: AppState = { tasks: generateTaskList() }

  render() {
    return (
      <Provider theme={theme}>
        <div
          style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{display:'flex', overflow:'hidden'}}>
            <div style={{overflow:'scroll'}}>
              <Sidebar />
            </div>
            <div style={{overflow:'scroll'}}>
              <TaskList tasks={this.state.tasks} />
            </div>
          </div>
        </div>
      </Provider>
    )
  }
}

export default App
