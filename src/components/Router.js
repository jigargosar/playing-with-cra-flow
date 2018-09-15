import { Link as RouterLink, Match, Router as ReachRouter } from '@reach/router'
import * as React from 'react'
import { classes, style } from '../typestyle-exports'
import { fg, hover } from '../styles'
import { accentColor } from '../theme'
import { extend } from 'typestyle/'

export const Route = ({ render, ...otherProps }) => render(otherProps)

export const Router = ReachRouter
export { Match }

export const LinkTo = ({ className, ...otherProps }) => (
  <RouterLink
    getProps={({ isCurrent }) => ({
      className: classes(
        style(
          isCurrent &&
            extend(fg(accentColor), hover(fg(accentColor.darken(0.2)))),
        ),
        className,
      ),
    })}
    {...otherProps}
  />
)
