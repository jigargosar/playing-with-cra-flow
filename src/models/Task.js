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
import type { Tag, TagCollection, TagId } from './Tag'
import { findById } from './Collection'
import Maybe from 'folktale/maybe'
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
  return sortWith([
    //
    ascend(getCategoryIndexOfTask),
    descend(prop('createdAt')),
    ascend(prop('title')),
  ])(tasksCollection)
}

export const filterTasks = (
  pred: Task => boolean,
  tasksCollection: TaskCollection,
) =>
  compose(
    filter(pred),
    getAllTasks,
  )(tasksCollection)

export function getActiveTasks(tasksCollection: TaskCollection): Task[] {
  return getAllTasks(tasksCollection).filter(task => !task.done)
}

export function getPendingCategoryTasks(
  category: Category,
  tasks: TaskCollection,
) {
  return getActiveTasks(tasks).filter(t => t.category === category)
}

export function getPendingTagTasks(tid: TagId, tasks: TaskCollection) {
  return getActiveTasks(tasks).filter(t => t.tagIds.includes(tid))
}

export function getDoneTasks(tasks: TaskCollection) {
  return getAllTasks(tasks).filter(t => t.done)
}

export const getTaskTags = (task: Task, tags: TagCollection): Maybe =>
  task.tagIds.map(tid => findById(tid)(tags))

export const donePred = (t: Task) => t.done
export const activePred = (t: Task) => !t.done
