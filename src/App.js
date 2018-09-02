import React, { Component, Fragment } from 'react'
import { Viewport, ViewportItem, ViewportScrollable } from './elements/Viewport'
import { Base, Button, Group, Provider } from 'reakit'
import * as faker from 'faker'
import { ascend, indexOf, sortWith, times } from 'ramda'

const categories = ['InBasket', 'NextAction', 'Project', 'Someday']

function createTask() {
  return {
    id: faker.random.alphaNumeric(4),
    title: faker.random.words(),
    category: faker.random.arrayElement(categories),
  }
}

function createTaskList(count = 10) {
  return times(createTask, count)
}

const getCategoryIndexOfTask = ({ category }) => indexOf(category)(categories)

class App extends Component {
  state = {
    tasks: createTaskList(),
  }

  addMoreTasks = () =>
    this.setState({ tasks: [...createTaskList(), ...this.state.tasks] })

  deleteAllTasks = () => this.setState({ tasks: [] })

  get currentTasks() {
    const comparators = [ascend(getCategoryIndexOfTask)]
    return sortWith(comparators)(this.state.tasks)
  }

  render() {
    return (
      <Provider>
        <Viewport>
          <ViewportItem padding="1rem">{this.renderHeader()}</ViewportItem>
          <ViewportScrollable padding="1rem">
            {this.renderCurrentTasksTasks()}
          </ViewportScrollable>
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
}

export default App
