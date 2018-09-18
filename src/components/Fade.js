import { CSSTransition } from 'react-transition-group'
import * as React from 'react'
import { stylesheet } from 'typestyle/'

const fadeDuration = 450
const fadeClasses = stylesheet({
  enter: {
    opacity: 0.01,
  },
  enterActive: {
    opacity: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    transition: `opacity ${fadeDuration}ms ease-in-out`,
    zIndex: 1,
  },
  exit: {
    opacity: 1,
  },
  exitActive: {
    opacity: 0.01,
    transition: `opacity ${fadeDuration}ms ease-in-out`,
  },
})
export const Fade = ({ ...otherProps }) => {
  return (
    <CSSTransition
      classNames={fadeClasses}
      timeout={fadeDuration}
      {...otherProps}
    />
  )
}
