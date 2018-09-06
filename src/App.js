// @flow

import * as React from 'react'
import { Component } from 'react'
import { Button, css, Grid, Provider } from 'reakit'
import { Icon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon/home'
import { chevronDown } from 'react-icons-kit/feather'

export const IconHome = () => <Icon size={'100%'} icon={home} />
export const ChevronDown = () => <Icon size={'100%'} icon={chevronDown} />

type AppState = {}

class App extends Component<{}, AppState> {
  state: AppState = {}

  render() {
    const template = `
    "a a a" 
    "b c c" minmax(200px, 1fr)
    "d d d"
`
    return <Provider theme={theme}>
        <Grid template={template} height={'100vh'}>
          <Grid.Item area="a" backgroundColor="red">
            Header
          </Grid.Item>
          <Grid.Item area="b" backgroundColor="green">
            Sidebar
          </Grid.Item>
          <Grid.Item area="c" backgroundColor="blue">
            Content
          </Grid.Item>
          <Grid.Item area="d" backgroundColor="yellow">
            Footer
          </Grid.Item>
        </Grid>
      </Provider>
  }
}

export default App

const theme = {
  Button: css`
    font-size: 14px;
    height: 2em;
    text-transform: uppercase;
  `,
  Group: css`
    > ${Button} {
      min-height: 2em;
      height: auto;
    }
  `,
}
