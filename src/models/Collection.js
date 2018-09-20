import { nullableToMaybe } from 'folktale/conversions'
import { curry } from 'ramda'

export const findById = curry((id, c) =>
  nullableToMaybe(c.find(m => m.id === id)),
)
