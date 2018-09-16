import * as React from 'react'
import { Fragment } from 'react'
import { BooleanValue, createNumberValue } from 'react-values'

const ModalCounter = createNumberValue(0)

type ModalProps = { trigger: Function, children: Function }

export const isAnyModalOpen = render => (
  <ModalCounter children={({ value }) => render(value > 0)} />
)

export function ModalState({ trigger, children }: ModalProps) {
  return (
    <ModalCounter
      children={({ increment, decrement }) => (
        <BooleanValue
          defaultValue={false}
          children={({ value: isOpen, set: setOpen }) => {
            const close = () => {
              setOpen(false)
              decrement()
            }
            const open = () => {
              setOpen(true)
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
        />
      )}
    />
  )
}
