// @flow
import { nullableToMaybe } from 'folktale/conversions'
import { clamp } from 'ramda'

export const atIndex = (idx: number, list: []) => nullableToMaybe(list[idx])
export const atClampedIndex = (idx: number, list: []) => {
  if (list.length === 0) {
    return nullableToMaybe(null)
  }
  return atIndex(clamp(0, list.length - 1, idx), list)
}
