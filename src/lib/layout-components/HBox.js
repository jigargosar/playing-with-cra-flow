import { classes, style } from 'typestyle'
import { horizontal, horizontallySpaced } from 'csstips'
import { createComponentFromMapper } from './createComponentFromMapper'

const HBox = createComponentFromMapper(
  ({ className, spacing = null, ...otherProps }) => ({
    className: classes(
      className,
      style(horizontal, spacing && horizontallySpaced(spacing)),
    ),
    ...otherProps,
  }),
)

export default HBox
