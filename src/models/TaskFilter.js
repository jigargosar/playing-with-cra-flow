// @flow

import type {Category} from './Category'
import type {TagId} from './Tag'

export opaque type AllFilter = {| type: 'all' |}
export opaque type DoneFilter = {| type: 'done' |}

export opaque type CategoryFilter = {| type: 'category', category: Category |}
export opaque type TagFilter = {| type: 'tag', tagId: TagId |}

export opaque type TaskFilter = AllFilter | CategoryFilter | DoneFilter | TagFilter

export function createCategoryFilter(category: Category): CategoryFilter {
  return { type: 'category', category }
}

export function createTagFilter(tagId: TagId): TagFilter {
  return { type: 'tag', tagId }
}

export function createAllFilter(): AllFilter {
  return { type: 'all' }
}

export function createDefaultCategoryFilter(): CategoryFilter {
  return createCategoryFilter('InBasket')
}

export function isCategoryFilter(filter: TaskFilter): boolean {
  return filter.type === 'category'
}

export function isCategoryFilterOf(
  category: Category,
  filter: TaskFilter,
): boolean {
  return filter.type === 'category' && filter.category === category
}

export function isAllFilter(filter: TaskFilter): boolean {
  return filter.type === 'all'
}

export function createDoneFilter() {
  return { type: 'done' }
}

export function isDoneFilter(filter: TaskFilter): boolean {
  return filter.type === 'done'
}
