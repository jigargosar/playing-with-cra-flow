import cn from 'classnames'
import { Link as ReachRouterLink } from '@reach/router'
import * as React from 'react'
import { styled } from 'reakit'

export const RenderPath = ({ render, ...otherProps }) => render(otherProps)
type Props = { to: string }

export function RouterLink({ ...other }: Props) {
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