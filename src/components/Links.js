import { LinkTo } from './Router'
import * as React from 'react'

export const LinkToCategory = ({ category, ...otherProps }) => (
  <LinkTo to={`/${category}`} {...otherProps}>
    {category}
  </LinkTo>
)
export const LinkToTag = ({ tag, ...otherProps }) => (
  <LinkTo to={`/${tag}`} {...otherProps}>
    {tag}
  </LinkTo>
)
