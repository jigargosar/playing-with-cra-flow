import React, {Component} from 'react'
import * as debug from 'debug'
import {ViewportFlexColumn} from './elements/ViewportFlexColumn'
import {Spacer} from './elements/Spacer'
import {Provider} from 'reakit'
import {CmdInput, CmdInputWrapper} from './elements/CmdInput'
import * as faker from 'faker'
import {Output, OutputWrapper} from './elements/Output'

const log = {
  cmd: debug('app:cmd'),
}

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

  componentDidMount() {
    this.executeCommand('a')
  }

  executeCommand = cmd => {
    log.cmd(`invoking`, cmd)
    switch (cmd) {
      case 'add':
      case 'a':
        log.cmd(`executing `, 'add')
        const task = createTask()
        const outputLine = `added new task : ${task.title}`
        this.setState({ tasks: [task, ...this.state.tasks] }, () =>
          this.setState({
            output: [...this.state.output, outputLine],
          }),
        )
        break
      case 'list':
      case 'ls':
        log.cmd(`executing `, 'list')
        this.setState({
          output: [
            ...this.state.output,
            ...this.state.tasks.map(
              (task, index) => `${`${index}`.padStart(2, '0')}: ${task.title}`,
            ),
          ],
        })
        break
      case 'clear':
      case 'cls':
        log.cmd(`executing `, 'clear')
        this.setState({
          output: [],
        })
        break
      default:
        log.cmd(`invalid`, cmd)
        break
    }
  }
  handleInputKeyPress = e => {
    if (e.key === 'Enter') {
      this.executeCommand(e.target.value)
    }
  }
  render() {
    return (
      <Provider>
        <ViewportFlexColumn>
          <Spacer />
          <OutputWrapper>
            <Output>
              {this.state.output.map((line, idx) => {
                return <div key={idx}>{`${line}`}</div>
              })}
            </Output>
          </OutputWrapper>
          <CmdInputWrapper>
            <CmdInput onKeyPress={this.handleInputKeyPress} />
          </CmdInputWrapper>
        </ViewportFlexColumn>
      </Provider>
    )
  }
}

export default App
