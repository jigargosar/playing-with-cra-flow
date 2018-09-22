import React from 'react'
import { classes, style } from 'typestyle'
import { vertical, verticallySpaced } from 'csstips'
import { rem } from 'csx'

export const createComponentFromMapper = mapperFn => ({
  is: Comp = 'div',
  ...otherProps
}) => <Comp {...mapperFn(otherProps)} />

export default createComponentFromMapper(
  ({ className, spacing = 0, ...otherProps }) => ({
    className: classes(
      style(vertical, verticallySpaced(rem(spacing))),
      className,
    ),
    ...otherProps,
  }),
)
