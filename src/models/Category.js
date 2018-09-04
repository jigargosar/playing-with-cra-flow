// @flow

import { identity } from 'ramda'

export type Category = 'InBasket' | 'NextAction' | 'Project' | 'Someday'

export const categories: Array<Category> = [
  'InBasket',
  'NextAction',
  'Project',
  'Someday',
]

export const CategoryInBasket: Category = 'InBasket'

export const categoryToString: Category => string = identity
