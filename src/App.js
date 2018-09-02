import React, {Component, Fragment} from 'react'
import {Viewport, ViewportItem, ViewportScrollable} from './elements/Viewport'
import {Base, Provider} from 'reakit'
import * as faker from 'faker'

const categories = ['InBasket', 'NextAction', 'Project', 'Someday']

function createTask() {
  return {
    id: faker.random.alphaNumeric(4),
    title: faker.random.words(),
    category: faker.random.arrayElement(categories),
  }
}

class App extends Component {
  state = {
    tasks: [
      //
      createTask(),
      createTask(),
      createTask(),
      createTask(),
    ],
    output: ['command: add a, list ls'],
  }

  render() {
    return (
      <Provider>
        <Viewport>
          <ViewportItem padding="1rem">Header</ViewportItem>
          <ViewportScrollable padding="1rem">
            {this.renderAllTasks()}
          </ViewportScrollable>
          <ViewportItem padding="1rem">Footer</ViewportItem>
        </Viewport>
      </Provider>
    )
  }

  renderAllTasks() {
    return this.state.tasks.map(task => (
      <Fragment key={task.id}>
        <Base margin="1rem">
          <div>{`${task.title}`}</div>
          <small>{`${task.category}`}</small>
        </Base>
      </Fragment>
    ));
  }
}

export default App
