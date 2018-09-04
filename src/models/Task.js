// @flow
import * as faker from 'faker'
import { categories } from './Category'

export function createTask() {
  return {
    id: faker.random.alphaNumeric(4),
    title: faker.random.words(),
    done: faker.random.boolean(),
    category: faker.random.arrayElement(categories),
  }
}
