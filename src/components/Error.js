// @flow
import React from 'react'

type Props = { message: any }

export function Error({ message }: Props) {
  console.log('props', message)
  return (
    <div>
      <h3>Error</h3>
      <p>{message}</p>
      <p>try going back or reload page</p>
    </div>
  )
}
