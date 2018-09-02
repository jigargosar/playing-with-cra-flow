import React, {Component} from 'react'
import {Viewport, ViewportItem, ViewportScrollable} from './elements/Viewport'
import {Provider} from 'reakit'
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
          <ViewportScrollable padding="1rem">Content</ViewportScrollable>
          <ViewportItem padding="1rem">Footer</ViewportItem>
        </Viewport>
      </Provider>
    )
  }
}

export default App
