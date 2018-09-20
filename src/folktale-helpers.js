import { nullableToMaybe } from 'folktale/conversions'
import { clamp, compose, curry, find, propEq } from 'ramda'

export const atIndex = (idx: number, list: []) => nullableToMaybe(list[idx])
export const atClampedIndex = (idx: number, list: []) => {
  if (list.length === 0) {
    return nullableToMaybe(null)
  }
  return atIndex(clamp(0, list.length - 1, idx), list)
}
export const findById = curry((id, c) =>
  compose(
    nullableToMaybe,
    find(propEq('id', id)),
  )(c.find(propEq('id', id))),
)
