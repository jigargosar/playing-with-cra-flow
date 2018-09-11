import { LinkTo } from './Router'
import * as React from 'react'

export const LinkToCategory = ({ category, ...otherProps }) => (
  <LinkTo to={`/category/${category}`} {...otherProps}>
    {category}
  </LinkTo>
)
export const LinkToTag = ({ tag, ...otherProps }) => (
  <LinkTo to={`/tag/${tag.title}/${tag.id}`} {...otherProps}>
    {`${tag.title}`}
  </LinkTo>
)
