import { classes, style } from 'typestyle'
import { vertical, verticallySpaced } from 'csstips'
import { rem } from 'csx'
import { createComponentFromMapper } from './createComponentFromMapper'

export default createComponentFromMapper(
  ({ className, spacing = null, ...otherProps }) => ({
    className: classes(
      style(vertical, spacing && verticallySpaced(rem(spacing))),
      className,
    ),
    ...otherProps,
  }),
)
