// @flow

import * as React from 'react'
import {Component, Fragment} from 'react'
import {Viewport} from './components/Viewport'
import {Button, Divider, Group, InlineBlock, Popover, Provider} from 'reakit'
import {find, propEq} from 'ramda'
import {
  IconButton,
  MenuItem,
  PageContent,
  PageContentWrapper,
  PageHeader,
  PageSidebar,
  SidebarItem,
  spacing1e,
  TagList,
  TagListItem,
  TaskItem,
  TaskItemCategory,
  TaskItemCategoryTitle,
  TaskItemTag,
  TaskItemTags,
  TaskTitle,
} from './components/elements'

import type {Category} from './models/Category'
import {categories} from './models/Category'
import type {Task, TaskCollection} from './models/Task'
import {createTaskList, setSomeTaskTags, setTaskCategory} from './models/Task'
import type {TaskFilter} from './models/TaskFilter'
import {
  createAllFilter,
  createCategoryFilter,
  createDoneFilter,
  createTagFilter,
  filterTasksCollection,
  isAllFilter,
  isCategoryFilterOf,
  isDoneFilter,
} from './models/TaskFilter'
import {FaChevronDown} from 'react-icons/all'
import type {Tag, TagCollection, TagId} from './models/Tag'
import {createTagList} from './models/Tag'

type AppState = {
  tasks: TaskCollection,
  filter: TaskFilter,
  tags: TagCollection,
  isTagsPage: boolean,
}

class App extends Component<{}, AppState> {
  //<editor-fold desc="state">
  state: AppState = {
    tasks: [],
    filter: createAllFilter(),
    tags: createTagList(),
    isTagsPage: false,
  }
  componentDidMount() {
    this.addMoreTasks()
  }
  getCurrentTasks(): Task[] {
    const tasksCollection = this.state.tasks
    const taskFilter = this.state.filter
    return filterTasksCollection(taskFilter, tasksCollection)
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
  setFilter = (filter: TaskFilter) => () => {
    this.setState({ filter, isTagsPage: false })
  }
  setTagsPage = (bool: boolean) => () => {
    this.setState({ isTagsPage: bool })
  }
  getTagById(id: TagId): Tag {
    return find(propEq('id', id))(this.state.tags)
  }
  updateTaskCategory = (category: Category, task: Task) => () => {
    const updatedTask = setTaskCategory(category, task)
    return this.setState({
      tasks: this.state.tasks.map(t => (t === task ? updatedTask : t)),
    })
  }
  //</editor-fold>
  //<editor-fold desc="render">
  render() {
    return (
      <Provider>
        <Viewport>
          <PageHeader>{this.renderHeader()}</PageHeader>
          <PageContentWrapper>
            <PageSidebar>{this.renderSidebar()}</PageSidebar>
            <PageContent>
              {this.state.isTagsPage
                ? this.renderTags()
                : this.renderCurrentTasks()}
            </PageContent>
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
      const selected = isAllFilter(this.state.filter) && !this.state.isTagsPage
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
      const selected = isDoneFilter(this.state.filter) && !this.state.isTagsPage
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
    const renderTagsSidebarItem = () => {
      const selected = this.state.isTagsPage
      return (
        <SidebarItem
          selected={selected}
          onClick={this.setTagsPage(true)}
          tabIndex={selected ? 0 : null}
        >
          Tags
        </SidebarItem>
      )
    }
    const renderCategorySideBarItem = category => {
      const selected =
        isCategoryFilterOf(category, this.state.filter) &&
        !this.state.isTagsPage
      return (
        <SidebarItem
          key={category}
          selected={selected}
          onClick={this.setFilter(createCategoryFilter(category))}
          tabIndex={selected ? 0 : null}
        >
          {`${category}`}
        </SidebarItem>
      )
    }
    return (
      <Fragment>
        {categories.map(renderCategorySideBarItem)}
        <Divider />
        {renderTagsSidebarItem()}
        <Divider />
        {renderAllSidebarItem()}
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

        <TaskItemCategory
          onClick={this.setFilter(createCategoryFilter(task.category))}
        >
          <TaskItemCategoryTitle>{`${task.category}`}</TaskItemCategoryTitle>
          {renderIconPopupMenu(
            <FaChevronDown />,
            categories.map(renderMenuItem(task)),
          )}
        </TaskItemCategory>
        <TaskItemTags>
          {task.tagIds.map(tagId => (
            <TaskItemTag
              key={tagId}
              onClick={this.setFilter(createTagFilter(tagId))}
            >
              {`#${this.getTagById(tagId).title}`}
            </TaskItemTag>
          ))}
        </TaskItemTags>
      </TaskItem>
    )

    return <Fragment>{this.getCurrentTasks().map(renderTask)}</Fragment>
  }
  renderTags = () => {
    const renderTag = tag => (
      <TagListItem
        key={tag.id}
        onClick={this.setFilter(createTagFilter(tag.id))}
      >{`#${tag.title}`}</TagListItem>
    )
    return <TagList>{this.state.tags.map(renderTag)}</TagList>
  }
  //</editor-fold>
}

export default App

function renderIconPopupMenu(icon, menuItems) {
  return (
    <Popover.Container>
      {popover => (
        <InlineBlock relative margin={`0 ${spacing1e}`}>
          <IconButton as={Popover.Toggle} {...popover}>
            {icon}
          </IconButton>
          <Popover fade slide expand hideOnClickOutside {...popover}>
            <Popover.Arrow />
            {menuItems}
          </Popover>
        </InlineBlock>
      )}
    </Popover.Container>
  )
}
