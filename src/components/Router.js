import { Link as ReachRouterLink } from '@reach/router'
import * as React from 'react'
import { styled } from 'reakit'

export const Route = ({ render, ...otherProps }) => render(otherProps)

export const LinkTo = styled(ReachRouterLink)`
  color: inherit;
  text-decoration: none;

  &[data-is-current='true'] {
    color: rgba(255, 99, 71, 1);
  }

  :hover {
    text-decoration: underline;
  }
`

LinkTo.defaultProps = {
  getProps: ({ isCurrent, location }) => ({
    'data-is-current': isCurrent,
  }),
}
