import React from 'react'
import { classes, style } from 'typestyle'
import { horizontal, horizontallySpaced } from 'csstips'

export default ({ className, spacing = 0, ...op }) => (
  <div
    className={classes(
      className,
      style(horizontal, horizontallySpaced(spacing)),
    )}
    {...op}
  />
)
