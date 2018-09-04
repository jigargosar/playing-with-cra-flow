// @flow

import * as faker from 'faker'
import Chance from 'chance'
import type {Category} from './Category'
import {categories} from './Category'
import {indexOf, times} from 'ramda'
import type {TagId} from './Tag'

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
    id: faker.random.alphaNumeric(4),
    title: faker.random.words(),
    done: chance.weighted([true, false], [20, 80]),
    category: faker.random.arrayElement(categories),
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
