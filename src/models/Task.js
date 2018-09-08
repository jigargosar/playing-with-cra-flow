// @flow

import * as faker from 'faker'
import Chance from 'chance'
import type { Category } from './Category'
import { categories } from './Category'
import { ascend, indexOf, sortWith, times } from 'ramda'
import type { Tag, TagId } from './Tag'

export const chance = Chance()

export type Task = {|
  id: string,
  title: string,
  done: boolean,
  category: Category,
  tagIds: TagId[],
  createdAt: number,
|}

export const generateTask = (): Task => ({
  // id: chance.n(chance.character, 4, { alpha: true }).join(''),
  id: faker.random.alphaNumeric(4),
  title: faker.random.words(),
  done: chance.weighted([true, false], [20, 80]),
  category: chance.pickone(categories),
  tagIds: [],
  createdAt: Date.now(),
})

export function generateTaskList(count: number = 50): Task[] {
  return times(generateTask, count)
}

export const getCategoryIndexOfTask = ({ category }: Task): number =>
  indexOf(category)(categories)

export const setTaskCategory = (category: Category, task: Task): Task => {
  return { ...task, category }
}

export const setSomeTaskTags = (tags: Tag[]) => (task: Task): Task => {
  const someTags: Tag[] = chance.pickset(tags, 5)
  return { ...task, tagIds: someTags.map(tag => tag.id) }
}
export type TaskCollection = Task[]

export function getAllTasks(tasksCollection: TaskCollection): Task[] {
  return sortWith([ascend(getCategoryIndexOfTask)])(tasksCollection)
}

export function getActiveTasks(tasksCollection: TaskCollection): Task[] {
  return getAllTasks(tasksCollection).filter(task => !task.done)
}

export function getPendingCategoryTasks(
  category: Category,
  tasks: TaskCollection,
) {
  return getActiveTasks(tasks).filter(t => t.category === category)
}

export function getDoneTasks(tasks: TaskCollection) {
  return getAllTasks(tasks).filter(t => t.done)
}
