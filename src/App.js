// @flow

import * as React from 'react'
import { Component } from 'react'
import { Provider } from 'reakit'
import { Icon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon/home'
import { chevronDown } from 'react-icons-kit/feather'
import { theme } from './components/theme'
import { Layout } from './components/Layout'

export const IconHome = () => <Icon size={'100%'} icon={home} />
export const ChevronDown = () => <Icon size={'100%'} icon={chevronDown} />

type AppState = {}

class App extends Component<{}, AppState> {
  state: AppState = {}

  render() {
    return (
      <Provider theme={theme}>
        <Layout>
          <Layout.Content />
        </Layout>
      </Provider>
    )
  }
}

export default App
