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
  }

  addMoreTasks = () =>
    this.setState({ tasks: [...createTaskList(), ...this.state.tasks] })

  deleteAllTasks = () => this.setState({ tasks: [] })

  get currentTasks() {
    // const comparators = [ascend(getCategoryIndexOfTask)]
    // return sortWith(comparators)(this.state.tasks)
    return filter(task => task.category === this.state.currentCategory)(
      this.state.tasks,
    )
  }

  render() {
    return (
      <Provider>
        <Viewport>
          <PageHeader>{this.renderHeader()}</PageHeader>
          <PageContentWrapper>
            <PageSidebar>{this.renderCategories()}</PageSidebar>
            <PageContent>{this.renderCurrentTasksTasks()}</PageContent>
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

  renderCategories = () => {
    return categories.map(category => {
      let selected = this.state.currentCategory === category
      return (
        <Fragment key={category}>
          <CategorySidebarItem
            selected={selected}
            onClick={this.setCurrentCategory(category)}
            tabIndex={selected ? 0 : null}
          >
            {`${category}`}
          </CategorySidebarItem>
        </Fragment>
      )
    })
  }

  setCurrentCategory = currentCategory => () => {
    this.setState({ currentCategory })
  }
}

export default App

const CategorySidebarItem = styled(Base)`
  ${ifProp(
    'selected',
    css`
      color: tomato;
    `,
  )};
  padding: 0.5rem 0;
  min-width: 8rem;
  cursor: pointer;
`

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
  padding: 1rem;
`
