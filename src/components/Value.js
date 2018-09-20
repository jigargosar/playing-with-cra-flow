// import * as React from 'react'
import { call, compose, when } from 'ramda'
import {
  toRenderProps,
  withHandlers,
  withPropsOnChange,
  withState,
} from 'recompose'
import { p } from '../promise'
import { isFunction } from '../ramda-exports'

export const withValue = compose(
  withState('value', 'set', ({ initial }) => when(isFunction)(call)(initial)),
  withPropsOnChange(['value'], ({ value, onChange }) => {
    onChange && onChange(value)
  }),
  withHandlers({
    set: ({ set }) => val => p(resolve => set(val, resolve)),
  }),
)
export const Value = toRenderProps(withValue)
