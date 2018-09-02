import React, { Component, Fragment } from 'react'
import { Viewport } from './elements/Viewport'
import { Base, Button, css, Flex, Group, Provider, styled } from 'reakit'
import * as faker from 'faker'
import { filter, indexOf, times } from 'ramda'
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

export const getCategoryIndexOfTask = ({ category }) =>
  indexOf(category)(categories)

class App extends Component {
  state = {
    tasks: createTaskList(),
    currentCategory: 'InBasket',
    filter: {
      type: 'category',
      category: 'InBasket',
    },
  }

  addMoreTasks = () =>
    this.setState({ tasks: [...createTaskList(), ...this.state.tasks] })

  deleteAllTasks = () => this.setState({ tasks: [] })

  get currentTasks() {
    const filterType = this.state.filter.type
    if (filterType === 'category') {
      const { category } = this.state.filter
      return filter(task => task.category === category)(this.state.tasks)
    } else {
      return this.state.tasks
    }
  }

  render() {
    return (
      <Provider>
        <Viewport>
          <PageHeader>{this.renderHeader()}</PageHeader>
          <PageContentWrapper>
            <PageSidebar>{this.renderSidebar()}</PageSidebar>
            <PageContent>{this.renderCurrentTasksTasks()}</PageContent>
          </PageContentWrapper>
        </Viewport>
      </Provider>
    )
  }

  renderSidebar() {
    return (
      <Fragment>
        <AllSidebarItem selected={this.isAllSidebarItemSelected()}>
          ALL
        </AllSidebarItem>
        {categories.map(category => {
          const selected = this.isCategorySidebarItemSelected(category)
          return (
            <CategorySidebarItem
              key={category}
              selected={selected}
              onClick={this.setCurrentCategory(category)}
              tabIndex={selected ? 0 : null}
            >
              {`${category}`}
            </CategorySidebarItem>
          )
        })}
      </Fragment>
    )
  }

  isAllSidebarItemSelected() {
    const { type } = this.state.filter
    return type === 'all'
  }

  renderHeader() {
    return (
      <Group>
        <Button onClick={this.addMoreTasks}>Add More</Button>
        <Button onClick={this.deleteAllTasks}>Delete All</Button>
      </Group>
    )
  }

  renderCurrentTasksTasks = () => {
    return this.currentTasks.map(task => (
      <Fragment key={task.id}>
        <Base margin="1rem" marginTop={0}>
          <div>{`${task.title}`}</div>
          <Base fontSize="0.7rem" textTransform="uppercase">{`${
            task.category
          }`}</Base>
        </Base>
      </Fragment>
    ))
  }

  isCategorySidebarItemSelected(_category) {
    const { type, category } = this.state.filter
    return type === 'category' && category === _category
  }

  setCurrentCategory = category => () => {
    this.setState({ filter: { type: 'category', category } })
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
