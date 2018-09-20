import * as faker from 'faker'
import Chance from 'chance'
import type { Category } from './Category'
import { categories } from './Category'
import {
  ascend,
  compose,
  descend,
  filter,
  indexOf,
  prop,
  sortWith,
  times,
} from 'ramda'
import type { Tag, TagId } from './Tag'
import { findById } from '../folktale-helpers'
import nanoid from 'nanoid'

export const chance = Chance()

export type Task = {|
  id: string,
  title: string,
  done: boolean,
  category: Category,
  tagIds: TagId[],
  createdAt: number,
|}

export type TaskModel = Task

export const generateTask = () => ({
  // id: chance.n(chance.character, 4, { alpha: true }).join(''),
  id: `task_${nanoid()}`,
  title: faker.random.words(),
  done: chance.weighted([true, false], [20, 80]),
  category: chance.pickone(categories),
  tagIds: [],
  createdAt: Date.now(),
  modifiedAt: Date.now(),
  dirty: true,
})

export function generateTaskList(count: number = 50): Task[] {
  return times(generateTask, count)
}

export const loadOrGenerateTasks = () => {
  const stored = localStorage.getItem('tasks')
  return stored ? JSON.parse(stored) : generateTaskList()
}

export const getCategoryIndexOfTask = ({ category }: Task): number =>
  indexOf(category)(categories)

export const setSomeTaskTags = (tags: Tag[]) => (task: Task): Task => {
  const someTags: Tag[] = chance.pickset(tags, 5)
  return { ...task, tagIds: someTags.map(tag => tag.id) }
}
export type TaskCollection = Task[]

export function getAllTasks(tasksCollection) {
  return sortWith([
    //
    ascend(getCategoryIndexOfTask),
    descend(prop('createdAt')),
    ascend(prop('title')),
  ])(tasksCollection)
}

export const filterTasks = (pred, tasksCollection) =>
  compose(
    filter(pred),
    getAllTasks,
  )(tasksCollection)

export const getTaskTags = (task, tags) =>
  task.tagIds.map(tid => findById(tid)(tags))

export const donePred = t => t.done
export const activePred = t => !t.done
