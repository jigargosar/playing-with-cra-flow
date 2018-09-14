import { nullableToMaybe } from 'folktale/conversions'

export type Model = { id: string }
export type Collection<Model> = Model[]

export const findById = id => c => nullableToMaybe(c.find(m => m.id === id))
