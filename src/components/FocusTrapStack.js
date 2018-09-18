import * as React from 'react'
import FocusTrapReact from 'focus-trap-react'
import Component from '@reach/component-component'
import { head, omit, tail } from 'ramda'

import { createStore, Provider, Subscribe } from 'react-contextual'
import { defaultProps } from 'recompose'

const stackStore = createStore({
  stack: [],
  push: item => ({ stack }) => ({ stack: [item, ...stack] }),
  pop: () => ({ stack }) => ({ stack: tail(stack) }),
})

export const FocusTrapStackProvider = defaultProps({ store: stackStore })(
  Provider,
)

export function FocusTrap({ ...otherProps }) {
  return (
    <Subscribe
      to={stackStore}
      select={({ stack, ...otherProps }) => ({
        ...otherProps,
        peek: () => head(stack),
      })}
    >
      {({ push, pop, peek }) => (
        <Component
          getRefs={() => ({ trapRef: React.createRef() })}
          didMount={({ refs }) => push(refs)}
          willUnmount={({ refs }) => {
            console.assert(peek() === refs)
            pop()
          }}
          children={({ refs }) => {
            return (
              <FocusTrapReact
                paused={peek() !== refs}
                ref={refs.trapRef}
                {...omit(['paused', 'ref'])(otherProps)}
              />
            )
          }}
        />
      )}
    </Subscribe>
  )
}
