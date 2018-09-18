import * as React from 'react'
import { LinkToTag } from './Links'
import { CollectionConsumer } from './CollectionContext'
import { block, rem, style, verticallySpaced } from '../typestyle-exports'
import { ttu } from '../styles'

const listClass = style(verticallySpaced(rem(1)))
const linkClass = style(ttu, block)

export function TagList() {
  const titleClass = style({
    fontSize: rem(1.5),
    marginBottom: rem(1),
  })
  return (
    <div>
      <div className={titleClass}>Tags</div>
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
