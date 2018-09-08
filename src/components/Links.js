import { LinkTo } from './Router'
import * as React from 'react'

export const LinkToCategory = ({ category, ...otherProps }) => (
  <LinkTo to={category} {...otherProps}>{category}</LinkTo>
)
