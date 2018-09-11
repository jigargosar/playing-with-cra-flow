// @flow

import * as React from 'react'
import styled from 'react-emotion'
import { LinkToTag } from './Links'
import { CollectionConsumer } from './CollectionContext'
import { rem, style, verticallySpaced } from './typestyle'

type Props = {}

export function TagList(p: Props) {
  const listClass = style(verticallySpaced(rem(0.5)))
  return (
    <div>
      <h2>Tags</h2>
      <CollectionConsumer>
        {({ tags }) => (
          <div className={listClass}>
            {tags.map(tag => (
              <TagItem key={tag.id}>
                <TagTitle>
                  <LinkToTag tag={tag} />
                </TagTitle>
              </TagItem>
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
