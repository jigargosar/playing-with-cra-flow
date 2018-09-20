import { nullableToMaybe } from 'folktale/conversions'
import Maybe from 'folktale/maybe'
import { clamp, compose, curry, find, propEq } from 'ramda'

export const atIndex = curry((idx, list) => nullableToMaybe(list[idx]))

export const atClampedIndex = curry((idx, list) => {
  if (list.length === 0) {
    return Maybe.Nothing
  }
  return atIndex(clamp(0, list.length - 1, idx), list)
})
export const findById = curry((id, c) =>
  compose(
    nullableToMaybe,
    find(propEq('id', id)),
  )(c.find(propEq('id', id))),
)
