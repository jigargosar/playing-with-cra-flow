// @flow

import * as React from 'react'
import { categories } from '../models/Category'
import { LinkTo } from './Router'
import { LinkToCategory } from './Links'
import { padding, rem, style } from '../typestyle-exports'
import { Divider } from '@blueprintjs/core'
import { VBox16 } from '../lib/layout-components/Box'

export function Sidebar() {
  return (
    <VBox16 className={containerStyle}>
      {categories.map(category => (
        <LinkToCategory key={category} category={category} />
      ))}
      <Divider />
      <LinkTo to={'/tag'}>Tags</LinkTo>
      <Divider />
      <LinkTo to={'/all'}>All</LinkTo>
      <LinkTo to={'/done'}>Done</LinkTo>
    </VBox16>
  )
}

const containerStyle = style(padding(rem(1)), {
  $nest: {
    '> a': { display: 'block' },
  },
})
