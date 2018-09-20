import { nullableToMaybe } from 'folktale/conversions'
import { curry, propEq } from 'ramda'

export const findById = curry((id, c) =>
  nullableToMaybe(c.find(propEq('id', id))),
)
