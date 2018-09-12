// @flow
import Component from '@reach/component-component'
import * as React from 'react'

export function storageGet(key: string, defaultState: any) {
  const storedState = localStorage.getItem(key)
  const parseState = storedState && JSON.parse(storedState)
  return parseState ? parseState : defaultState
}

export function StorageSet({ name, value }: { name: string, value: any }) {
  const didMountOrUpdate = ({ props: { name, value } }) => {
    localStorage.setItem(name, JSON.stringify(value))
  }
  return (
    <Component
      name={name}
      value={value}
      didMount={didMountOrUpdate}
      didUpdate={didMountOrUpdate}
    />
  )
}
