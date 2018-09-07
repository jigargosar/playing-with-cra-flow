import * as React from 'react'
import { Fragment } from 'react'
import { LayoutGrid } from './LayoutGrid'
import { Block } from 'reakit'

export default [
  {
    name: 'Only Content',
    component: LayoutGrid,
    props: {
      children: (
        <LayoutGrid.Content>
          <Block backgroundColor={'blue'}>Content</Block>
        </LayoutGrid.Content>
      ),
    },
  },
  {
    name: 'Holy Grail',
    component: LayoutGrid,
    props: {
      children: (
        <Fragment>
          <LayoutGrid.Header>
            <Block backgroundColor={'red'}>Header</Block>
          </LayoutGrid.Header>
          <LayoutGrid.Sidebar>
            <Block backgroundColor={'green'}>Sidebar</Block>
          </LayoutGrid.Sidebar>
          <LayoutGrid.Content>
            <Block backgroundColor={'blue'}>Content</Block>
          </LayoutGrid.Content>
          <LayoutGrid.Footer>
            <Block backgroundColor={'yellow'}>Footer</Block>
          </LayoutGrid.Footer>
        </Fragment>
      ),
    },
  },
]
