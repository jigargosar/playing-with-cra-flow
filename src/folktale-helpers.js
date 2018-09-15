// @flow
import { nullableToMaybe } from 'folktale/conversions'

export const atIndex = (idx: number, list: []) => nullableToMaybe(list[idx])
