import { Link as RouterLink, Router as ReachRouter } from '@reach/router'
import styled from 'react-emotion'

export const Route = ({ render, ...otherProps }) => render(otherProps)

export const Router = ReachRouter

export const LinkTo = styled(RouterLink)`
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
