// @flow

import type {Category} from './Category'
import type {TagId} from './Tag'
import type {TaskCollection} from './Task'
import {getCategoryIndexOfTask} from './Task'
import {ascend, sortWith} from 'ramda'

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

function getAllTasks(tasksCollection) {
  const sortedTasks = sortWith([ascend(getCategoryIndexOfTask)])(
    tasksCollection,
  )
  return sortedTasks;
}

function getActiveTasks(tasksCollection) {
  const activeTasks = getAllTasks(tasksCollection).filter(task => !task.done)
  return activeTasks;
}

export function filterTasksCollection(
  taskFilter: TaskFilter,
  tasksCollection: TaskCollection,
): TaskCollection {
  switch (taskFilter.type) {
    case 'category':
      const category = taskFilter.category
      return getActiveTasks(tasksCollection).filter(task => task.category === category)
    case 'tag':
      const tagId = taskFilter.tagId
      return getActiveTasks(tasksCollection).filter(task => task.tagIds.includes(tagId))
    case 'all':
      return getActiveTasks(tasksCollection)
    case 'done':
      return getAllTasks(tasksCollection).filter(task => task.done)
    default:
      console.assert(false, 'Invalid TaskFilter', taskFilter)
      return []
  }
}
