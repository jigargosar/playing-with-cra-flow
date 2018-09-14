// @flow
import React from 'react'

type Props = { children: any }

export function Error({ children }: Props) {
  return (
    <div>
      <h3>Error</h3>
      <p>{children}</p>
      <p>try going back or reload page</p>
    </div>
  )
}
