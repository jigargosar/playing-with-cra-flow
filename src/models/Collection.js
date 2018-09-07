export type Model = {id:string}
export type Collection<Model> = Model[]


export const findById = id=>c=> c.find(m=> m.id===id)

