import * as React from 'react'
import FocusTrapReact from 'focus-trap-react'
import Component from '@reach/component-component'
import { head, mergeDeepRight, omit, tail } from 'ramda'

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

export function FocusTrap({ focusTrapOptions = {}, ...otherProps }) {
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
          children={({ refs }) => (
            <FocusTrapReact
              paused={peek() !== refs}
              // active={peek() === refs}
              ref={refs.trapRef}
              {...omit(['paused', 'ref', 'focusTrapOptions'])(otherProps)}
              focusTrapOptions={mergeDeepRight(
                {
                  returnFocusOnDeactivate: true,
                  // returnFocusOnDeactivate: false,
                  escapeDeactivates: true,
                  onActivate: () => console.log('onActivate'),
                  onDeactivate: () => console.log('onDeactivate'),
                },
                focusTrapOptions,
              )}
            />
          )}
        />
      )}
    </Subscribe>
  )
}
