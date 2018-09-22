import { classes, style } from 'typestyle'
import { vertical, verticallySpaced } from 'csstips'
import { rem } from 'csx'
import { createComponentFromMapper } from './createComponentFromMapper'

export default createComponentFromMapper(
  ({ className, spacing = 0, ...otherProps }) => ({
    className: classes(
      style(vertical, verticallySpaced(rem(spacing))),
      className,
    ),
    ...otherProps,
  }),
)
