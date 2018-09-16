import * as React from 'react'
import { Fragment } from 'react'
import { BooleanValue, createNumberValue } from 'react-values'
import Composer from 'react-composer'

const ModalCounter = createNumberValue(0)

type ModalProps = { trigger: Function, children: Function }

export const isAnyModalOpen = render => (
  <ModalCounter children={({ value }) => render(value > 0)} />
)

export function ModalState({ trigger, children }: ModalProps) {
  return (
    <Composer
      components={[<ModalCounter />, <BooleanValue defaultValue={false} />]}
      children={([
        { increment, decrement },
        { value: isOpen, set: setOpen },
      ]) => {
        const childProps = {
          open: () => {
            setOpen(true)
            increment()
          },
          close: () => {
            setOpen(false)
            decrement()
          },
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
  )
}
