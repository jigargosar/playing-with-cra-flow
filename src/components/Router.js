import { Link as RouterLink, Match, Router as ReachRouter } from '@reach/router'
import * as React from 'react'
import { classes, style } from '../typestyle-exports'
import { fg } from '../styles'

export const Route = ({ render, ...otherProps }) => render(otherProps)

export const Router = ReachRouter
export { Match }

export const LinkTo = ({ className, ...otherProps }) => (
  <RouterLink
    getProps={({ isCurrent }) => ({
      className: classes(
        style(isCurrent && fg('rgba(255, 99, 71, 1)')),
        className,
      ),
    })}
    {...otherProps}
  />
)
