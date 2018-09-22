import React from 'react'
import { classes, style } from 'typestyle'

export default ({ className, ...op }) => (
  <div className={classes(className, style())} {...op} />
)
