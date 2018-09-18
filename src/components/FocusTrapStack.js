import * as React from 'react'
import FocusTrapReact from 'focus-trap-react'
import Component from '@reach/component-component'
import { head, omit, tail } from 'ramda'

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

const { Provider, Consumer } = createComponentContext({
  initialState: { stack: [] },
})

export const FocusTrapProvider = Provider

export function FocusTrap({ ...otherProps }) {
  return (
    <Consumer>
      {({ state: { stack }, setState: setStackState }) => {
        return (
          <Component
            getRefs={() => ({ trapRef: React.createRef() })}
            didMount={({ refs }) => {
              setStackState({ stack: [refs, ...stack] })
              console.log(`didMount: stack`, stack)
              console.log(`didMount: stack.length`, stack.length)
            }}
            didUpdate={() => {
              console.log(`didUpdate: stack`, stack)
              console.log(`didUpdate: stack.length`, stack.length)
            }}
            willUnmount={({ refs }) => {
              console.log(`willUnmount: stack`, stack)
              console.log(`willUnmount: stack.length`, stack.length)
              const oldRefs = head(stack)
              console.log('willUnmount', refs, oldRefs)
              console.assert(oldRefs === refs)
              setStackState({ stack: tail(stack) })
            }}
            children={({ refs }) => {
              const paused = head(stack) !== refs
              console.log(`paused`, paused, stack.length)
              return (
                <FocusTrapReact
                  paused={paused}
                  ref={refs.trapRef}
                  {...omit(['paused', 'ref'])(otherProps)}
                />
              )
            }}
          />
        )
      }}
    </Consumer>
  )
}
