import * as React from 'react'
import FocusTrapReact from 'focus-trap-react'
import Component from '@reach/component-component'
import {
  compose,
  head,
  identical,
  lensProp,
  mergeDeepRight,
  omit,
  over,
  reject,
  tail,
} from 'ramda'

import { createStore, Provider, Subscribe } from 'react-contextual'
import { defaultProps } from 'recompose'
import { noop } from '../ramda-exports'

const stackStore = createStore({
  stack: [],
  push: item => ({ stack }) => ({ stack: [item, ...stack] }),
  pop: () => ({ stack }) => ({ stack: tail(stack) }),
  remove: item => ({ stack }) => {
    console.assert(stack.includes(item), `stack.includes(item)`)
    return { stack: reject(identical(item))(stack) }
  },
})

export const FocusTrapStackProvider = defaultProps({ store: stackStore })(
  Provider,
)

export function FocusTrap({ focusTrapOptions = {}, ...otherProps }) {
  return (
    <Subscribe
      to={stackStore}
      select={({ stack, ...otherProps }) => ({
        ...otherProps,
        peek: () => head(stack),
      })}
    >
      {({ push, pop, peek, remove }) => (
        <Component
          getRefs={() => ({ trapRef: React.createRef() })}
          didMount={({ refs }) => push(refs)}
          willUnmount={({ refs }) => remove(refs)}
          children={({ refs }) => {
            const paused = peek() !== refs
            // console.log(`paused`, paused)
            return (
              <FocusTrapReact
                paused={paused}
                ref={refs.trapRef}
                focusTrapOptions={compose(
                  over(lensProp('onDeactivate'))(fn =>
                    compose(
                      () => remove(refs),
                      fn,
                    ),
                  ),
                  mergeDeepRight({
                    returnFocusOnDeactivate: true,
                    // returnFocusOnDeactivate: false,
                    escapeDeactivates: true,
                    onActivate: noop,
                    onDeactivate: noop,
                  }),
                )(focusTrapOptions)}
                {...omit(['paused', 'ref', 'focusTrapOptions'])(otherProps)}
              />
            )
          }}
        />
      )}
    </Subscribe>
  )
}
