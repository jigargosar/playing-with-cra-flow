import { withProps } from 'recompose'
import { TaskList } from './components/TaskList'
import { getDoneTasks, getPendingCategoryTasks } from './models/Task'

export const CategoryTaskList = withProps(({ tasks, category }) => ({
  tasks: getPendingCategoryTasks(category, tasks),
}))(TaskList)

export const DoneTaskList = withProps(({ tasks }) => ({
  tasks: getDoneTasks(tasks),
}))(TaskList)
