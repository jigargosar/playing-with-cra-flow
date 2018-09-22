import React from 'react'
import { classes, style } from 'typestyle'
import { horizontal, horizontallySpaced } from 'csstips'
import { rem } from 'csx'

const mapProps = ({ className, spacing = 0, ...otherProps }) => ({
  className: classes(
    style(horizontal, horizontallySpaced(rem(spacing))),
    className,
  ),
  ...otherProps,
})

export default ({ is: Comp = 'div', props }) => <Comp {...mapProps(props)} />
