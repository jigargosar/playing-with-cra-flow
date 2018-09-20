// import * as React from 'react'
import { compose, prop } from 'ramda'
import {
  toRenderProps,
  withHandlers,
  withPropsOnChange,
  withState,
} from 'recompose'
import { p } from '../promise'

export const Value = toRenderProps(
  compose(
    withState('value', 'set', prop('initial')),
    withPropsOnChange(['value'], ({ value, onChange }) => {
      onChange && onChange(value)
    }),
    withHandlers({
      set: ({ set }) => val => p(resolve => set(val, resolve)),
    }),
  ),
)
