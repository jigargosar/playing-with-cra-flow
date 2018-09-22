import { classes, style } from 'typestyle'
import {
  center,
  horizontal,
  horizontallySpaced,
  vertical,
  verticallySpaced,
} from 'csstips'
import { createComponentFromMapper } from './createComponentFromMapper'
import { defaultProps } from 'recompose'

export const HBox = createComponentFromMapper(
  ({ className, spacing = null, center: c = true, ...otherProps }) => ({
    className: classes(
      className,
      style(horizontal, spacing && horizontallySpaced(spacing), c && center),
    ),
    ...otherProps,
  }),
)

const defaultSpacing = spacing => defaultProps({ spacing })

export const HBox8 = defaultSpacing(8)(HBox)
export const HBox16 = defaultSpacing(8)(HBox)

export const VBox = createComponentFromMapper(
  ({ className, spacing = null, ...otherProps }) => ({
    className: classes(
      style(vertical, spacing && verticallySpaced(spacing)),
      className,
    ),
    ...otherProps,
  }),
)

export const VBox8 = defaultSpacing(8)(VBox)
export const VBox16 = defaultSpacing(8)(VBox)
