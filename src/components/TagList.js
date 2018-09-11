// @flow

import * as React from 'react'
import { LinkToTag } from './Links'
import { CollectionConsumer } from './CollectionContext'
import { block, rem, style, ttu, verticallySpaced } from './typestyle'

type Props = {}

const listClass = style(verticallySpaced(rem(0.5)))
const linkClass = style(ttu, block)

export function TagList(p: Props) {
  return (
    <div>
      <h2>Tags</h2>
      <CollectionConsumer>
        {({ tags }) => (
          <div className={listClass}>
            {tags.map(tag => <LinkToTag className={linkClass} tag={tag} />)}
          </div>
        )}
      </CollectionConsumer>
    </div>
  )
}
