import React, {Component} from 'react'
import * as debug from 'debug'
import {ViewportFlexColumn} from './elements/ViewportFlexColumn'
import {Spacer} from './elements/Spacer'
import {Provider} from 'reakit'
import {CmdInput, CmdInputWrapper} from './elements/CmdInput'
import * as faker from 'faker'

const log = {
  cmd: debug('app:cmd'),
}

function createTask() {
  return { id: faker.random.alphaNumeric(4), title: faker.random.words() }
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
  }

  componentDidMount() {
    this.executeCommand('a')
  }

  executeCommand = cmd => {
    log.cmd(`invoking`, cmd)
    switch (cmd) {
      case 'add':
      case 'a':
        log.cmd(`executing `,'add')
        break
      case 'list':
      case 'ls':
        log.cmd(`executing `, 'list')
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
          <CmdInputWrapper>
            <CmdInput onKeyPress={this.handleInputKeyPress} />
          </CmdInputWrapper>
        </ViewportFlexColumn>
      </Provider>
    )
  }
}

export default App
