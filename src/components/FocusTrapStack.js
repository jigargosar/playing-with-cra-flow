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

export const App = () => (
  <Provider store={stackStore}>
    <Subscribe to={stackStore}>{props => <div>{props.text}</div>}</Subscribe>
  </Provider>
)

export function createComponentContext(componentProps) {
  const { Provider, Consumer } = React.createContext({})
  const ComponentProvider = providerProps => (
    <Component
      children={componentChildProps => (
        <Provider value={componentChildProps} {...providerProps} />
      )}
      {...componentProps}
    />
  )

  return { Provider: ComponentProvider, Consumer }
}

const stackCtx = createComponentContext({
  initialState: { stack: [] },
})

export const FocusTrapProvider = stackCtx.Provider
export const FocusTrapStackProvider = defaultProps({ store: stackStore })(
  Provider,
)
// export const FocusTrapStackProvider = defaultProps({})('div')

export function FocusTrap({ ...otherProps }) {
  return (
    <Subscribe
      to={stackStore}
      select={({ stack, ...props }) => ({
        stack,
        ...props,
        peek: () => head(stack),
      })}
    >
      {({ push, pop, peek }) => (
        <Component
          getRefs={() => ({ trapRef: React.createRef() })}
          didMount={({ refs }) => {
            push(refs)
          }}
          didUpdate={() => {}}
          willUnmount={({ refs }) => {
            const oldRefs = peek()
            console.log('willUnmount', refs, oldRefs)
            console.assert(oldRefs === refs)
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
