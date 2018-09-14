// @flow
import Component from '@reach/component-component'
import * as React from 'react'
import { nullableToMaybe } from 'folktale/conversions'

export function storageGet(key: string, defaultState: any) {
  return nullableToMaybe(localStorage.getItem(key))
    .map(JSON.parse)
    .getOrElse(defaultState)
}

export function storageSet(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function StorageSet({ name, value }: { name: string, value: any }) {
  const didMountOrUpdate = ({ props: { name, value } }) => {
    storageSet(name, value)
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
