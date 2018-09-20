import { nullableToMaybe } from 'folktale/conversions'
import Maybe from 'folktale/maybe'
import { __, clamp, compose, curry, find, map, propEq } from 'ramda'

export const atIndex = curry((idx, list) => nullableToMaybe(list[idx]))

export const atClampedIndex = curry((idx, list) => {
  return compose(
    map(atIndex(__)),
    clampIndex(idx),
  )(list)
})

export const clampIndex = curry((idx, list) => {
  return list.length === 0 ? Maybe.Nothing : clamp(0, list.length - 1, idx)
})

export const findById = curry((id, c) =>
  compose(
    nullableToMaybe,
    find(propEq('id', id)),
  )(c.find(propEq('id', id))),
)
