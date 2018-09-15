// @flow
import Component from '@reach/component-component'
import * as React from 'react'

export const renderWithComponent = (props: Object, render: any) => (
  <Component {...props}>{render}</Component>
)
