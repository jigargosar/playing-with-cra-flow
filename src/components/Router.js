import { Link as RouterLink, Router as ReachRouter } from '@reach/router'
import styled from 'react-emotion'
import * as React from 'react'
import { classes, style } from './typestyle'

export const Route = ({ render, ...otherProps }) => render(otherProps)

export const Router = ReachRouter

export const Link = styled(RouterLink)`
  color: inherit;
  text-decoration: none;

  &[data-is-current='true'] {
    color: rgba(255, 99, 71, 1);
  }

  :hover {
    text-decoration: underline;
  }
`

Link.defaultProps = {
  getProps: ({ isCurrent, location }) => ({
    'data-is-current': isCurrent,
  }),
}

export const LinkTo = ({ className, ...otherProps }) => (
  <RouterLink
    getProps={({ isCurrent, location }) => ({
      className: classes(style(), className),
    })}
    {...otherProps}
  />
)
