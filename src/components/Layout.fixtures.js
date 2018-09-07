import * as React from 'react'
import { Fragment } from 'react'
import { Layout } from './LayoutGrid'
import { Block } from 'reakit'

export default [
  {
    name: 'Only Content',
    component: Layout,
    props: {
      children: (
        <Layout.Content>
          <Block backgroundColor={'blue'}>Content</Block>
        </Layout.Content>
      ),
    },
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
