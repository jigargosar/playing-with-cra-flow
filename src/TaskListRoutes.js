import { withProps } from 'recompose'
import { TaskList } from './components/TaskList'
import { getActiveTasks, getAllTasks } from './models/Task'

export const CategoryTaskList = withProps(({ tasks, category }) => ({
  tasks: getActiveTasks(tasks).filter(t => t.category === category),
}))(TaskList)

export const DoneTaskList = withProps(({ tasks }) => ({
  tasks: getAllTasks(tasks).filter(t => t.done),
}))(TaskList)
