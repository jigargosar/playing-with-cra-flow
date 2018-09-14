// @flow

import * as React from 'react'
import { Component } from 'react'
import { categories } from '../models/Category'
import { LinkTo } from './Router'
import { LinkToCategory } from './Links'
import { padding, rem, style, verticallySpaced } from '../typestyle-exports'

type Props = {}

export class Sidebar extends Component<Props> {
  render() {

    return (
      <div className={containerStyle}>
        {categories.map(category => (
          <LinkToCategory key={category} category={category} />
        ))}
        <hr />
        <LinkTo to={'/tag'}>Tags</LinkTo>
        <hr />
        <LinkTo to={'/all'}>All</LinkTo>
        <LinkTo to={'/done'}>Done</LinkTo>
      </div>
    )
  }
}

const containerStyle = style(padding(rem(1)), verticallySpaced(rem(1)), {
  $nest: {
    '> a': { display: 'block' },
  },
})
