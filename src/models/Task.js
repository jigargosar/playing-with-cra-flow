// @flow

import * as faker from 'faker'
import Chance from 'chance'
import type { Category } from './Category'
import { categories } from './Category'
import { ascend, indexOf, sortWith, times } from 'ramda'
import type { Tag, TagId } from './Tag'

const chance = Chance()

export type Task = {|
  id: string,
  title: string,
  done: boolean,
  category: Category,
  tagIds: TagId[],
  createdAt: number,
|}

export const createRandomTask = (ch: Chance = chance) => (): Task => ({
  id: ch.n(ch.character, 4, { alpha: true }).join(''),
  title: faker.random.words(),
  done: ch.weighted([true, false], [20, 80]),
  category: ch.pickone(categories),
  tagIds: [],
  createdAt: Date.now(),
})

export function createTaskList(count: number = 50): Task[] {
  return times(createRandomTask(), count)
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
