import cn from 'classnames'
import { Link as ReachRouterLink } from '@reach/router'
import * as React from 'react'
import { styled } from 'reakit'

export const Route = ({ render, ...otherProps }) => render(otherProps)

export function LinkTo2({ ...other }) {
  return (
    <RouterLinkWrapper>
      <ReachRouterLink getProps={propsToCN} {...other} />
    </RouterLinkWrapper>
  )
}

function propsToCN({ isCurrent, isPartiallyCurrent }) {
  return {
    className: cn({
      current: isCurrent,
      partiallyCurrent: isPartiallyCurrent,
    }),
  }
}

const RouterLinkWrapper = styled.span`
  > a {
    color: inherit;
    text-decoration: none;
  }

  > a.partiallyCurrent {
    color: rgba(255, 99, 71, 0.8);
  }

  > a.current {
    color: rgba(255, 99, 71, 1);
  }

  > a:hover {
    text-decoration: underline;
  }
`

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
  getProps: ({ isCurrent }) => ({ 'data-is-current': isCurrent }),
}