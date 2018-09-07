import * as React from 'react'
import { Fragment } from 'react'
import { Layout } from './Layout'
import { Block } from 'reakit'

export default [
  {
    name: 'Empty',
    component: Layout,
  },
  {
    name: 'Holy Grail',
    component: Layout,
    props: {
      children: (
        <Fragment>
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
        </Fragment>
      ),
    },
  },
]
