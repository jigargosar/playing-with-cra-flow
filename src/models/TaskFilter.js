// @flow

import type {Category} from './Category'
import type {TagId} from './Tag'
import type {TaskCollection} from './Task'
import {getCategoryIndexOfTask} from './Task'
import {ascend, prop, reject, sortWith} from 'ramda'

export opaque type AllFilter = {| type: 'all' |}
export opaque type DoneFilter = {| type: 'done' |}

export opaque type CategoryFilter = {| type: 'category', category: Category |}
export opaque type TagFilter = {| type: 'tag', tagId: TagId |}

export type TaskFilter = AllFilter | CategoryFilter | DoneFilter | TagFilter

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

export function createDoneFilter(): DoneFilter {
  return { type: 'done' }
}

export function isDoneFilter(filter: TaskFilter): boolean {
  return filter.type === 'done'
}

export function filterTasksCollection(
  taskFilter: TaskFilter,
  tasksCollection: TaskCollection,
): TaskCollection {
  const activeTasks = reject(prop('done'))(tasksCollection)
  switch (taskFilter.type) {
    case 'category':
      const category = taskFilter.category
      return activeTasks.filter(task => task.category === category)
    case 'tag':
      const tagId = taskFilter.tagId
      return activeTasks.filter(task => task.tagIds.includes(tagId))
    case 'all':
      return sortWith([ascend(getCategoryIndexOfTask)])(activeTasks)
    case 'done':
      const doneTasks = tasksCollection.filter(prop('done'))
      return sortWith([ascend(getCategoryIndexOfTask)])(doneTasks)
    default:
      console.assert(false, 'Invalid TaskFilter', taskFilter)
      return []
  }
}
