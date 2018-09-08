// @flow

import * as React from 'react'
import { Fragment } from 'react'
import { styled } from 'reakit'
import type { Tag } from '../models/Tag'
import { LinkToTag } from './Links'

type Props = {
  tags: Tag[],
}

export function TagsList({ tags }: Props) {
  return (
    <Fragment>
      <h2>Tags</h2>
      <TagItemsLayout>
        {tags.map(tag => (
          <TagItem key={tag.id}>
            <TagTitle>
              <LinkToTag tag={tag} />
            </TagTitle>
          </TagItem>
        ))}
      </TagItemsLayout>
    </Fragment>
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
