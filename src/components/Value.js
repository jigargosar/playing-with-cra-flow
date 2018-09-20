// import * as React from 'react'
import { compose, prop } from 'ramda'
import { toRenderProps, withProps, withState } from 'recompose'
import { p } from '../promise'

export const Value = toRenderProps(
  compose(
    withState('value', 'set', prop('value')),
    withProps(({ set }) => ({
      set: val => p(resolve => set(val, resolve)),
    })),
  ),
)
