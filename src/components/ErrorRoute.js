// @flow
import React, { Fragment } from 'react'

export function ErrorRoute(props: any) {
  console.log('props', props)
  return (
    <Fragment>
      Internal Error: please file bug report, or try going back
    </Fragment>
  )
}
