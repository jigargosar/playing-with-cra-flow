import { classes, style } from 'typestyle'
import { vertical, verticallySpaced } from 'csstips'
import { createComponentFromMapper } from './createComponentFromMapper'

export default createComponentFromMapper(
  ({ className, spacing = null, ...otherProps }) => ({
    className: classes(
      style(vertical, spacing && verticallySpaced(spacing)),
      className,
    ),
    ...otherProps,
  }),
)
