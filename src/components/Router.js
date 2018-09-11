import { Link as RouterLink, Router as ReachRouter } from '@reach/router'
import * as React from 'react'
import { classes, style } from '../typestyle-exports'

export const Route = ({ render, ...otherProps }) => render(otherProps)

export const Router = ReachRouter

export const LinkTo = ({ className, ...otherProps }) => (
  <RouterLink
    getProps={({ isCurrent, location }) => ({
      className: classes(
        style(isCurrent && { color: 'rgba(255, 99, 71, 1)' }),
        className,
      ),
    })}
    {...otherProps}
  />
)
