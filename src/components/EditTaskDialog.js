import * as React from 'react'
import { Fragment } from 'react'
import { noop } from 'ramda-adjunct/'
import Component from '@reach/component-component'
import { createNumberValue } from 'react-values'

const { Provider, Consumer } = React.createContext({
  onDismiss: noop,
  isOpen: false,
  title: '',
  onTitleChange: noop,
  onOk: noop,
  startEditingTask: noop,
  category: 'InBasket',
  onCategoryChange: noop,
})

const ModalCounter = createNumberValue(0)

type ModalProps = { trigger: Function, children: Function }

export const isAnyModalOpen = render => (
  <ModalCounter children={({ value }) => render(value > 0)} />
)

export function ModalState({ trigger, children }: ModalProps) {
  return (
    <ModalCounter
      children={({ increment, decrement }) => (
        <Component initialState={{ isOpen: false }}>
          {({ state: { isOpen }, setState }) => {
            const close = () => {
              setState({ isOpen: false })
              decrement()
            }
            const open = () => {
              setState({ isOpen: true })
              increment()
            }
            const childProps = {
              open,
              close,
              isOpen,
            }
            return (
              <Fragment>
                {trigger(childProps)}
                {isOpen && children(childProps)}
              </Fragment>
            )
          }}
        </Component>
      )}
    />
  )
}
