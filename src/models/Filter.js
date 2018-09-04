// @flow

import type { Category } from './Category'
import { CategoryInBasket } from './Category'

export opaque type AllFilter = {| type: 'all' |}
export opaque type DoneFilter = {| type: 'done'|}

export opaque type CategoryFilter = {| type: 'category', category: Category |}

export opaque type Filter = AllFilter | CategoryFilter | DoneFilter

export function createCategoryFilter(category: Category): CategoryFilter {
  return { type: 'category', category }
}

export function createAllFilter(): AllFilter {
  return { type: 'all' }
}

export function createDefaultCategoryFilter(): CategoryFilter {
  return createCategoryFilter(CategoryInBasket)
}

export function isCategoryFilter(filter: Filter): boolean {
  return filter.type === 'category'
}

export function isCategoryFilterOf(
  category: Category,
  filter: Filter,
): boolean {
  return filter.type === 'category' && filter.category === category
}

export function isAllFilter(filter: Filter): boolean {
  return filter.type === 'all'
}

export function createDoneFilter() {
  return { type: 'done' }
}

export function isDoneFilter(filter: Filter): boolean {
  return filter.type === 'done'
}
