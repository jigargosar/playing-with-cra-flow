import { compose, withProps } from 'recompose'
import { TaskList } from './components/TaskList'

export const CategoryTaskList = compose(
  withProps(({ tasks, category }) => ({
    tasks: tasks.filter(t => t.category === category),
  })),
)(TaskList)