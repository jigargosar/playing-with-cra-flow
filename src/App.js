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
function createDefaultCategoryFilter() {
  return createCategoryFilter('InBasket')
}

export const getCategoryIndexOfTask = ({ category }) =>
  indexOf(category)(categories)

class App extends Component {
  state = {
    tasks: createTaskList(),
    filter: createDefaultCategoryFilter(),
  }

  addMoreTasks = () =>
    this.setState({ tasks: [...createTaskList(), ...this.state.tasks] })

  deleteAllTasks = () => this.setState({ tasks: [] })

  get currentTasks() {
    switch (this.state.filter.type) {
      case 'category':
        const { category } = this.state.filter
        return filter(task => task.category === category)(this.state.tasks)
      default:
        return sortWith([ascend(getCategoryIndexOfTask)])(this.state.tasks)
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
    return (
      <Fragment>
        <AllSidebarItem
          selected={this.isAllSidebarItemSelected()}
          onClick={this.setAllFilter}
          tabIndex={this.isAllSidebarItemSelected() ? 0 : null}
        >
          ALL
        </AllSidebarItem>
        {categories.map(category => (
          <CategorySidebarItem
            key={category}
            selected={this.isCategorySidebarItemSelected(category)}
            onClick={this.setCategoryFilter(category)}
            tabIndex={this.isCategorySidebarItemSelected(category) ? 0 : null}
          >
            {`${category}`}
          </CategorySidebarItem>
        ))}
      </Fragment>
    )
  }

  isCategorySidebarItemSelected(_category) {
    const { type, category } = this.state.filter
    return type === 'category' && category === _category
  }

  setCategoryFilter = category => () => {
    this.setState({ filter: { type: 'category', category } })
  }
  isAllSidebarItemSelected() {
    const { type } = this.state.filter
    return type === 'all'
  }

  setAllFilter = () => {
    this.setState({ filter: { type: 'all' } })
  }

  renderCurrentTasks = () => {
    return this.currentTasks.map(task => (
      <Fragment key={task.id}>
        <Base margin="1rem" marginTop={0}>
          <div>{`${task.title}`}</div>
          {this.shouldDisplayTaskCategory() && (
            <Base fontSize="0.7rem" textTransform="uppercase">{`${
              task.category
            }`}</Base>
          )}
        </Base>
      </Fragment>
    ))
  }

  shouldDisplayTaskCategory() {
    return this.state.filter.type !== 'category'
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
