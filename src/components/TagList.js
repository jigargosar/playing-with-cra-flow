import * as React from 'react'
import { LinkToTag } from './Links'
import { CollectionConsumer } from './CollectionContext'
import { block, rem, style } from '../typestyle-exports'
import { ttu } from '../styles'
import { VBox16 } from '../lib/layout-components/Box'
import { style } from 'typestyle'
import { block } from 'csstips'

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
          <VBox16>
            {tags.map(tag => (
              <LinkToTag key={tag.id} className={style(ttu, block)} tag={tag} />
            ))}
          </VBox16>
        )}
      </CollectionConsumer>
    </div>
  )
}
