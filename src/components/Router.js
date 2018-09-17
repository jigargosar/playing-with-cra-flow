import {
  Link as RouterLink,
  Location,
  Match,
  Router as ReachRouter,
} from '@reach/router'
import * as React from 'react'
import { classes, style } from '../typestyle-exports'
import { fgHoverDarken } from '../styles'
import { accentColor } from '../theme'

export { Location }
export const Route = ({ render, ...otherProps }) => render(otherProps)

export const Router = ReachRouter
export { Match }

export const LinkTo = ({ className, ...otherProps }) => (
  <RouterLink
    getProps={({ isCurrent }) => ({
      className: classes(
        style(isCurrent && fgHoverDarken(accentColor)),
        className,
      ),
    })}
    {...otherProps}
  />
)
