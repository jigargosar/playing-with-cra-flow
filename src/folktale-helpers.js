import { nullableToMaybe } from 'folktale/conversions'
import { compose, curry, find, propEq } from 'ramda'

export const findById = curry((id, c) =>
  compose(
    nullableToMaybe,
    find(propEq('id', id)),
  )(c.find(propEq('id', id))),
)
