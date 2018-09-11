// @flow

import * as React from 'react'
import styled from 'react-emotion'
import { LinkToTag } from './Links'
import { CollectionConsumer } from './CollectionContext'
import { rem, style, ttu, verticallySpaced } from './typestyle'

type Props = {}

const listClass = style(verticallySpaced(rem(0.5)))

export function TagList(p: Props) {
  return (
    <div>
      <h2>Tags</h2>
      <CollectionConsumer>
        {({ tags }) => (
          <div className={listClass}>
            {tags.map(tag => (
              <TagTitle key={tag.id} className={style(ttu)}>
                <LinkToTag tag={tag} />
              </TagTitle>
            ))}
          </div>
        )}
      </CollectionConsumer>
    </div>
  )
}

const TagTitle = styled.div``
const TagItem = styled.div`
  text-transform: uppercase;
`
