export type Model = {id:string}
export type Collection<Model> = Model[]

export const findByIdOrUndefined = id => c => c.find(m => m.id === id)


