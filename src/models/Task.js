// @flow

import * as faker from 'faker'
import Chance from 'chance'
import type {Category} from './Category'
import {categories} from './Category'
import {indexOf, times} from 'ramda'
import type {Tag, TagId} from './Tag'

const chance = Chance()

export type Task = {|
  id: string,
  title: string,
  done: boolean,
  category: Category,
  tagIds: TagId[],
|}

export function createTask(): Task {
  return {
    id: chance.n(chance.character, 4, { alpha: true }),
    title: faker.random.words(),
    done: chance.weighted([true, false], [20, 80]),
    category: chance.pickone(categories),
    tagIds: [],
  }
}

export function createTaskList(count: number = 50): Task[] {
  return times(createTask, count)
}

export const getCategoryIndexOfTask = ({ category }: Task): number =>
  indexOf(category)(categories)

export const setTaskCategory = (category: Category, task: Task): Task => {
  return { ...task, category }
}

export const setSomeTaskTags = (tags: Tag[]) => (task: Task): Task => {
  const someTags: Tag[] = chance.pickset(
    tags,
    chance.integer({ min: 0, max: 3 }),
  )
  return { ...task, tagIds: someTags.map(tag => tag.id) }
}
