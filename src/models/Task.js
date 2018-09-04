// @flow

import * as faker from 'faker'
import type { Category } from './Category'
import { categories } from './Category'
import { indexOf, times } from 'ramda'

export type Task = {|
  id: string,
  title: string,
  done: boolean,
  category: Category,
|}

export function createTask(): Task {
  return {
    id: faker.random.alphaNumeric(4),
    title: faker.random.words(),
    done: faker.random.boolean(),
    category: faker.random.arrayElement(categories),
  }
}

export function createTaskList(count: number = 20): Task[] {
  return times(createTask, count)
}

export const getCategoryIndexOfTask = ({ category }: Task): number =>
  indexOf(category)(categories)

export const setTaskCategory = (category: Category, task: Task): Task => {
  return { ...task, category }
}
