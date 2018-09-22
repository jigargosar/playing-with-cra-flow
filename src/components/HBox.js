import React from 'react'
import { classes, style } from 'typestyle'
import { horizontal, horizontallySpaced } from 'csstips'
import { rem } from 'csx'

export default ({ className, spacing = 0, ...op }) => (
  <div
    className={classes(
      style(horizontal, horizontallySpaced(rem(spacing))),
      className,
    )}
    {...op}
  />
)
