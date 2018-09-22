import React from 'react'
import { classes, style } from 'typestyle'
import { horizontal, horizontallySpaced } from 'csstips'
import { rem } from 'csx'
import { proper, withProps } from '../lib/proper'

export const P = proper(withProps())

export default ({ className, spacing = 0, ...op }) => (
  <div
    className={classes(
      style(horizontal, horizontallySpaced(rem(spacing))),
      className,
    )}
    {...op}
  />
)
