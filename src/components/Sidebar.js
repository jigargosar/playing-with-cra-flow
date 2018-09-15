// @flow

import * as React from 'react'
import { categories } from '../models/Category'
import { LinkTo } from './Router'
import { LinkToCategory } from './Links'
import { padding, rem, style, verticallySpaced } from '../typestyle-exports'
import { ArrowKeyNavigator } from './ArrowKeyNavigator'

export function Sidebar() {
  return (
    <ArrowKeyNavigator>
      {({ containerRef, onKeyDown }) => (
        <div
          ref={containerRef}
          onKeyDown={onKeyDown}
          className={containerStyle}
        >
          {categories.map(category => (
            <LinkToCategory key={category} category={category} />
          ))}
          <hr />
          <LinkTo to={'/tag'}>Tags</LinkTo>
          <hr />
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
