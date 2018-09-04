// @flow

import * as faker from 'faker'
import type { Category } from './Category'
import { categories } from './Category'
import { times } from 'ramda'

type Task = {
  id: string,
  title: string,
  done: boolean,
  category: Category,
}

export function createTask(): Task {
  return {
    id: faker.random.alphaNumeric(4),
    title: faker.random.words(),
    done: faker.random.boolean(),
    category: faker.random.arrayElement(categories),
  }
}

export function createTaskList(count: number = 20) {
  return times(createTask, count)
}
