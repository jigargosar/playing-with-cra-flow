import React, { Component, Fragment } from 'react'
import { Viewport } from './elements/Viewport'
import { Base, Button, css, Flex, Group, Provider, styled } from 'reakit'
import * as faker from 'faker'
import { ascend, filter, indexOf, sortWith, times } from 'ramda'
import { ifProp } from 'styled-tools'

const categories = ['InBasket', 'NextAction', 'Project', 'Someday']

function createTask() {
  return {
    id: faker.random.alphaNumeric(4),
    title: faker.random.words(),
    category: faker.random.arrayElement(categories),
  }
}
function createTaskList(count = 20) {
  return times(createTask, count)
}

function createCategoryFilter(category) {
  return { type: 'category', category }
}
function createAllFilter() {
  return { type: 'all' }
}
function createDefaultCategoryFilter() {
  return createCategoryFilter('InBasket')
}

export const getCategoryIndexOfTask = ({ category }) =>
  indexOf(category)(categories)

function getFilterType({ type }) {
  return type
}

function getFilterCategory(filter) {
  console.assert(filter.type === 'category')
  console.assert(categories.includes(filter.category))
  return filter.category
}

function isCategoryFilterOf(_category, { type, category }) {
  return type === 'category' && category === _category
}

function isAllFilter({ type }) {
  return type === 'all'
}

class App extends Component {
  state = {
    tasks: createTaskList(),
    filter: createDefaultCategoryFilter(),
  }

  addMoreTasks = () =>
    this.setState({ tasks: [...createTaskList(), ...this.state.tasks] })

  deleteAllTasks = () => this.setState({ tasks: [] })

  get currentTasks() {
    let filterType = getFilterType(this.state.filter)
    switch (filterType) {
      case 'category':
        return filter(
          task => task.category === getFilterCategory(this.state.filter),
        )(this.state.tasks)
      case 'all':
        return sortWith([ascend(getCategoryIndexOfTask)])(this.state.tasks)
      default:
        console.assert(false, 'invalid filter type', filterType)
        return []
    }
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
    let selected = isAllFilter(this.state.filter)
    return (
      <Fragment>
        <AllSidebarItem
          selected={selected}
          onClick={this.setFilter(createAllFilter())}
          tabIndex={selected ? 0 : null}
        >
          All
        </AllSidebarItem>
        {categories.map(category => {
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
        })}
      </Fragment>
    )
  }

  setFilter = filter => () => {
    this.setState({ filter })
  }

  renderCurrentTasks = () => {
    let shouldDisplayTaskCategory = this.state.filter.type !== 'category'
    return this.currentTasks.map(task => (
      <Fragment key={task.id}>
        <Base margin="1rem" marginTop={0}>
          <div>{`${task.title}`}</div>
          {shouldDisplayTaskCategory && (
            <Base fontSize="0.7rem" textTransform="uppercase">{`${
              task.category
            }`}</Base>
          )}
        </Base>
      </Fragment>
    ))
  }
}

export default App

const SidebarItem = styled(Base)`
  ${ifProp(
    'selected',
    css`
      color: tomato;
    `,
  )};
  padding: 0.5rem;
  min-width: 8rem;
  cursor: pointer;
`
const AllSidebarItem = styled(SidebarItem)``
const CategorySidebarItem = styled(SidebarItem)``

const PageHeader = styled(Base)`
  padding: 1rem;
`

const PageSidebar = styled(Base)`
  overflow: scroll;
  padding: 1rem;
  border-right: 1px solid #ddd;
`
const PageContent = styled(Base)`
  flex: auto;
  overflow: scroll;
  padding: 1rem;
`
const PageContentWrapper = styled(Flex)`
  height: 100%;
  flex: auto;
  flex-direction: row;
`
