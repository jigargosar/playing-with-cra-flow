// @flow

import type { Category } from './Category'
import { CategoryInBasket } from './Category'

type AllFilter = {| type: 'all' |}
type DoneFilter = {| type: 'done'|}

type CategoryFilter = {| type: 'category', category: Category |}

type Filter = AllFilter | CategoryFilter | DoneFilter

export function createCategoryFilter(category: Category): CategoryFilter {
  return { type: 'category', category }
}

export function createAllFilter(): AllFilter {
  return { type: 'all' }
}

export function createDefaultCategoryFilter(): CategoryFilter {
  return createCategoryFilter(CategoryInBasket)
}

export function getFilterType(filter: Filter): string {
  return filter.type
}

export function getFilterCategory(filter: CategoryFilter): Category {
  return filter.category
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
