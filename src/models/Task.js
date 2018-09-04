// @flow

import * as faker from 'faker'
import type { Category } from './Category'
import { categories } from './Category'

type Task = {
  category: Category,
  done: boolean,
  id: string,
  title: string,
}

export function createTask():Task{
  return {
    id: faker.random.alphaNumeric(4),
    title: faker.random.words(),
    done: faker.random.boolean(),
    category: faker.random.arrayElement(categories),
  }
}
