// @flow

import * as React from 'react'
import { Component } from 'react'
import { Block, Provider } from 'reakit'
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
          <Layout.Header>
            <Block backgroundColor={'red'}>Header</Block>
          </Layout.Header>
          <Layout.Sidebar>
            <Block backgroundColor={'green'}>Sidebar</Block>
          </Layout.Sidebar>
          <Layout.Content>
            <Block backgroundColor={'blue'}>Content</Block>
          </Layout.Content>
          <Layout.Footer>
            <Block backgroundColor={'yellow'}>Footer</Block>
          </Layout.Footer>
        </Layout>
      </Provider>
    )
  }
}

export default App
