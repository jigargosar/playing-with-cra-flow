import { classes, style } from 'typestyle'
import {
  horizontal,
  horizontallySpaced,
  vertical,
  verticallySpaced,
} from 'csstips'
import { createComponentFromMapper } from './createComponentFromMapper'

export const HBox = createComponentFromMapper(
  ({ className, spacing = null, ...otherProps }) => ({
    className: classes(
      className,
      style(horizontal, spacing && horizontallySpaced(spacing)),
    ),
    ...otherProps,
  }),
)

export const VBox = createComponentFromMapper(
  ({ className, spacing = null, ...otherProps }) => ({
    className: classes(
      style(vertical, spacing && verticallySpaced(spacing)),
      className,
    ),
    ...otherProps,
  }),
)
