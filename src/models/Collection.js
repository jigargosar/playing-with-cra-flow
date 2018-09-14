import { nullableToMaybe } from 'folktale/conversions'

export type Model = { id: string }
export type Collection<Model> = Model[]

export const findByIdOrUndefined = id => c => c.find(m => m.id === id)
export const findById = id => c => nullableToMaybe(c.find(m => m.id === id))
