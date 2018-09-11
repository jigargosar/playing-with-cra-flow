// @flow

import * as React from 'react'
import { LinkToTag } from './Links'
import { CollectionConsumer } from './CollectionContext'
import { block, rem, style, verticallySpaced } from '../typestyle-exports'
import { ttu } from '../styles'

type Props = {}

const listClass = style(verticallySpaced(rem(1)))
const linkClass = style(ttu, block)

export function TagList(p: Props) {
  return (
    <div>
      <h2>Tags</h2>
      <CollectionConsumer>
        {({ tags }) => (
          <div className={listClass}>
            {tags.map(tag => (
              <LinkToTag key={tag.id} className={linkClass} tag={tag} />
            ))}
          </div>
        )}
      </CollectionConsumer>
    </div>
  )
}
