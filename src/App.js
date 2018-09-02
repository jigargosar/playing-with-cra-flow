import React, { Component, Fragment } from 'react'
import { Viewport, ViewportItem } from './elements/Viewport'
import { Base, Button, Flex, Group, Provider, styled } from 'reakit'
import * as faker from 'faker'
import { filter, indexOf, times } from 'ramda'

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

const getCategoryIndexOfTask = ({ category }) => indexOf(category)(categories)

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
          <ViewportItem padding="1rem">{this.renderHeader()}</ViewportItem>
          <Flex row flex="1 1 auto" height={'100%'}>
            <Base overflow="scroll" padding="1rem">
              {this.renderCategories()}
            </Base>
            <Base flex="auto" overflow="scroll" padding="1rem">
              {this.renderCurrentTasksTasks()}
            </Base>
          </Flex>
          {/*<ViewportItem padding="1rem">Footer</ViewportItem>*/}
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
    return categories.map(category => (
      <Fragment key={category}>
        <CategoryItem
          onClick={this.setCurrentCategory(category)}
        >{`${category}`}</CategoryItem>
      </Fragment>
    ))
  }

  setCurrentCategory = currentCategory => () => {
    this.setState({ currentCategory })
  }
}

export default App

const CategoryItem = styled(Base)`
  padding: 0.5rem 0;
  min-width: 8rem;
  cursor: pointer;
`
