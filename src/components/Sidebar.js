// @flow

import * as React from 'react'
import { categories } from '../models/Category'
import { LinkTo } from './Router'
import { LinkToCategory } from './Links'
import { padding, rem, style, verticallySpaced } from '../typestyle-exports'
import { ArrowKeyNavigator } from './ArrowKeyNavigator'
import { Divider } from '@blueprintjs/core'

export function Sidebar() {
  return (
    <ArrowKeyNavigator>
      {({ containerRef, onKeyDown, onFocus }) => (
        <div
          ref={containerRef}
          // onKeyDown={onKeyDown}
          // onFocus={onFocus}
          className={containerStyle}
        >
          {categories.map(category => (
            <LinkToCategory key={category} category={category} />
          ))}
          <Divider />
          <LinkTo to={'/tag'}>Tags</LinkTo>
          <Divider />
          <LinkTo to={'/all'}>All</LinkTo>
          <LinkTo to={'/done'}>Done</LinkTo>
        </div>
      )}
    </ArrowKeyNavigator>
  )
}

const containerStyle = style(padding(rem(1)), verticallySpaced(rem(1)), {
  $nest: {
    '> a': { display: 'block' },
  },
})
