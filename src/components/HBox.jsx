import React from 'react'
import { classes, style } from 'typestyle'
import { horizontal } from 'csstips'

export default ({ className, ...op }) => (
  <div className={classes(className, style(horizontal))} {...op} />
)
