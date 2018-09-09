// @flow

import * as React from 'react'
import { styled } from 'reakit'
import { LinkToTag } from './Links'
import { CollectionConsumer } from './CollectionContext'

type Props = {}

export function TagList({  }: Props) {
  return (
    <TagItemsLayout>
      <h2>Tags</h2>
      <CollectionConsumer>
        {tags =>
          tags.map(tag => (
            <TagItem key={tag.id}>
              <TagTitle>
                <LinkToTag tag={tag} />
              </TagTitle>
            </TagItem>
          ))
        }
      </CollectionConsumer>
    </TagItemsLayout>
  )
}

const TagTitle = styled.div``
const TagItem = styled.div`
  text-transform: uppercase;
`
const TagItemsLayout = styled.div`
  > ${TagItem} {
    margin: 0.5rem;
  }
`
