// @flow

import * as React from 'react'
import { Fragment } from 'react'
import { Heading, styled } from 'reakit'
import type { Tag } from '../models/Tag'

type Props = {
  tags: Tag[],
}

export function TagsList({ tags }: Props) {
  return (
    <Fragment>
      <Heading as={'h4'}>Tags</Heading>
      <TagItemsLayout>
        {tags.map(tag => (
          <TagItem key={tag.id}>
            <TagTitle>{tag.title}</TagTitle>
          </TagItem>
        ))}
      </TagItemsLayout>
    </Fragment>
  )
}

const TagTitle = styled.div``
const TagItem = styled.div``
const TagItemsLayout = styled.div`
  > ${TagItem} {
    margin: 0.5rem;
  }
`
