// @flow

import * as React from 'react'
import {Component, Fragment} from 'react'
import {Viewport} from './components/Viewport'
import {Button, Group, InlineBlock, Popover, Provider} from 'reakit'
import {ascend, eqProps, filter, Filter, find, prop, propEq, reject, sortWith,} from 'ramda'
import {
  CategorySidebarItem,
  MenuItem,
  PageContent,
  PageContentWrapper,
  PageHeader,
  PageSidebar,
  SidebarItem,
  TaskItem,
  TaskItemCategory,
  TaskTitle,
} from './components/elements'

import type {Category} from './models/Category'
import {categories} from './models/Category'
import type {Task} from './models/Task'
import {createTaskList, getCategoryIndexOfTask, setSomeTaskTags, setTaskCategory,} from './models/Task'
import {
  createAllFilter,
  createCategoryFilter,
  createDoneFilter,
  isAllFilter,
  isCategoryFilter,
  isCategoryFilterOf,
  isDoneFilter,
} from './models/Filter'
import {FaEllipsisH} from 'react-icons/fa'
import type {Tag, TagId} from './models/Tag'
import {createTagList} from './models/Tag'

type AppState = { tasks: Task[], filter: Filter, tags: Tag[] }

class App extends Component<{}, AppState> {
  state: AppState = {
    tasks: [],
    filter: createAllFilter(),
    tags: createTagList(),
  }

  componentDidMount() {
    this.addMoreTasks()
  }

  getCurrentTasks(): Task[] {
    const activeTasks = reject(prop('done'))(this.state.tasks)
    switch (this.state.filter.type) {
      case 'category':
        return filter(eqProps('category', this.state.filter))(activeTasks)
      case 'all':
        return sortWith([ascend(getCategoryIndexOfTask)])(activeTasks)
      case 'done':
        const doneTasks = filter(prop('done'))(this.state.tasks)
        return sortWith([ascend(getCategoryIndexOfTask)])(doneTasks)
      default:
        console.assert(false, 'Invalid Filter', this.state.filter)
        return []
    }
  }
  addMoreTasks = () => {
    return this.setState({
      tasks: [
        ...createTaskList().map(setSomeTaskTags(this.state.tags)),
        ...this.state.tasks,
      ],
    })
  }

  deleteAllTasks = () => this.setState({ tasks: [] })
  setFilter = (filter: Filter) => () => {
    this.setState({ filter })
  }
  updateTaskCategory = (category: Category, task: Task) => () => {
    const updatedTask = setTaskCategory(category, task)
    return this.setState({
      tasks: this.state.tasks.map(t => (t === task ? updatedTask : t)),
    })
  }
  render() {
    return (
      <Provider>
        <Viewport>
          <PageHeader>{this.renderHeader()}</PageHeader>
          <PageContentWrapper>
            <PageSidebar>{this.renderSidebar()}</PageSidebar>
            <PageContent>{this.renderCurrentTasks()}</PageContent>
          </PageContentWrapper>
        </Viewport>
      </Provider>
    )
  }
  renderHeader() {
    return (
      <Group>
        <Button onClick={this.addMoreTasks}>Add More</Button>
        <Button onClick={this.deleteAllTasks}>Delete All</Button>
      </Group>
    )
  }
  renderSidebar() {
    const renderAllSidebarItem = () => {
      const selected = isAllFilter(this.state.filter)
      return (
        <SidebarItem
          selected={selected}
          onClick={this.setFilter(createAllFilter())}
          tabIndex={selected ? 0 : null}
        >
          All
        </SidebarItem>
      )
    }
    const renderDoneSidebarItem = () => {
      const selected = isDoneFilter(this.state.filter)
      return (
        <SidebarItem
          selected={selected}
          onClick={this.setFilter(createDoneFilter())}
          tabIndex={selected ? 0 : null}
        >
          Done
        </SidebarItem>
      )
    }
    const renderCategorySideBarItem = category => {
      const selected = isCategoryFilterOf(category, this.state.filter)
      return (
        <CategorySidebarItem
          key={category}
          selected={selected}
          onClick={this.setFilter(createCategoryFilter(category))}
          tabIndex={selected ? 0 : null}
        >
          {`${category}`}
        </CategorySidebarItem>
      )
    }
    return (
      <Fragment>
        {renderAllSidebarItem()}
        {categories.map(renderCategorySideBarItem)}
        {renderDoneSidebarItem()}
      </Fragment>
    )
  }
  renderCurrentTasks = () => {
    const renderMenuItem = task => category => (
      <MenuItem
        key={category}
        selected={task.category === category}
        onClick={this.updateTaskCategory(category, task)}
      >
        {category}
      </MenuItem>
    )

    const renderTask = (task: Task): React.Node => (
      <TaskItem key={task.id}>
        <TaskTitle done={task.done}>{`${task.title}`}</TaskTitle>
        {renderIconPopupMenu(
          <FaEllipsisH />,
          categories.map(renderMenuItem(task)),
        )}

        {!isCategoryFilter(this.state.filter) && (
          <TaskItemCategory>{`${task.category}`}</TaskItemCategory>
        )}
        {task.tagIds.map(tagId => (
          <TaskItemCategory key={tagId}>{`${
            this.getTagById(tagId).title
          }`}</TaskItemCategory>
        ))}
      </TaskItem>
    )

    return (this.getCurrentTasks().map(renderTask): React.Node[])
    // return this.getCurrentTasks().map(renderTask)
  }

  getTagById(id: TagId): Tag {
    return find(propEq('id', id))(this.state.tags)
  }
}

export default App

function renderIconPopupMenu(icon, menuItems) {
  return (
    <Popover.Container>
      {popover => (
        <InlineBlock relative>
          <Button as={Popover.Toggle} {...popover}>
            {icon}
          </Button>
          <Popover fade slide expand hideOnClickOutside {...popover}>
            <Popover.Arrow />
            {menuItems}
          </Popover>
        </InlineBlock>
      )}
    </Popover.Container>
  )
}
