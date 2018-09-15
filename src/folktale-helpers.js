// @flow
import { nullableToMaybe } from 'folktale/conversions'
import { clamp } from 'ramda'

export const atIndex = (idx: number, list: []) => nullableToMaybe(list[idx])
export const atClampedIndex = (idx: number, list: []) => {
  const listLength = list.length
  if (listLength === 0) {
    return nullableToMaybe(null)
  }
  return atIndex(clamp(0, listLength - 1, idx), list)
}
