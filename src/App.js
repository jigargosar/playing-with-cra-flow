// @flow

import * as React from 'react'
import { Component, Fragment } from 'react'
import { Viewport } from './components/Viewport'
import { Base, Button, Group, InlineBlock, Popover, Provider } from 'reakit'
import { ascend, Filter, filter, prop, propEq, reject, sortWith } from 'ramda'
import { FaEllipsisH } from 'react-icons/all'
import {
  CategorySidebarItem,
  MenuItem,
  PageContent,
  PageContentWrapper,
  PageHeader,
  PageSidebar,
  SidebarItem,
  TaskTitle,
} from './components/elements'
import type { Category } from './models/Category'
import { categories } from './models/Category'
import type { Task } from './models/Task'
import { createTaskList, getCategoryIndexOfTask, setTaskCategory } from './models/Task'
import {
  createAllFilter,
  createCategoryFilter,
  createDoneFilter,
  isAllFilter,
  isCategoryFilter,
  isCategoryFilterOf,
  isDoneFilter,
} from './models/Filter'

type AppState = { tasks: Task[], filter: Filter }

class App extends Component<{}, AppState> {
  state: AppState = {
    tasks: createTaskList(),
    filter: createDoneFilter(),
  }

  addMoreTasks = () =>
    this.setState({ tasks: [...createTaskList(), ...this.state.tasks] })

  deleteAllTasks = () => this.setState({ tasks: [] })

  getCurrentTasks(): Task[] {
    let activeTasks = reject(prop('done'))(this.state.tasks)
    switch (this.state.filter.type) {
      case 'category':
        return filter(propEq('category', this.state.filter))(activeTasks)
      case 'all':
        return sortWith([ascend(getCategoryIndexOfTask)])(activeTasks)
      case 'done':
        let doneTasks = filter(prop('done'))(this.state.tasks)
        return sortWith([ascend(getCategoryIndexOfTask)])(doneTasks)
      default:
        console.assert(false, 'invalid filter type', this.state.filter)
        return []
    }
  }

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
    let renderAllSidebarItem = () => {
      let selected = isAllFilter(this.state.filter)
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
    let renderDoneSidebarItem = () => {
      let selected = isDoneFilter(this.state.filter)
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

    let renderCategorySideBarItem = category => {
      let selected = isCategoryFilterOf(category, this.state.filter)
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
    let shouldDisplayTaskCategory = !isCategoryFilter(this.state.filter)
    let renderTask = (task: Task): React.Node => (
      <Fragment key={task.id}>
        <Base margin="1rem" marginTop={0}>
          <TaskTitle done={task.done}>{`${task.title}`}</TaskTitle>
          <Popover.Container>
            {popover => (
              <InlineBlock relative>
                <Button as={Popover.Toggle} {...popover}>
                  <FaEllipsisH />
                </Button>
                <Popover fade slide expand hideOnClickOutside {...popover}>
                  <Popover.Arrow />
                  {categories.map(category => {
                    let selected = task.category === category
                    return (
                      <MenuItem
                        key={category}
                        selected={selected}
                        onClick={this.updateTaskCategory(category, task)}
                      >
                        {category}
                      </MenuItem>
                    )
                  })}
                </Popover>
              </InlineBlock>
            )}
          </Popover.Container>

          {shouldDisplayTaskCategory && (
            <Base fontSize="0.7rem" textTransform="uppercase">{`${
              task.category
            }`}</Base>
          )}
        </Base>
      </Fragment>
    )
    return (this.getCurrentTasks().map(renderTask): React$Node[])
    // return this.getCurrentTasks().map(renderTask)
  }
}

export default App
