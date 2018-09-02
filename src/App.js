import React, {Component} from 'react'
import * as debug from 'debug'
import {ViewportFlexColumn} from './elements/ViewportFlexColumn'
import {Spacer} from './elements/Spacer'
import {Input, Provider} from 'reakit'

const log = {
  cmd: debug('app:cmd'),
}

class App extends Component {
  componentDidMount() {
    this.executeCommand('a')
  }

  executeCommand = cmd => {
    log.cmd(`invoking`, cmd)
    switch (cmd) {
      case 'add':
      case 'a':
        log.cmd(`executing add`)
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
          <Input autoFocus type="text" onKeyPress={this.handleInputKeyPress} />
        </ViewportFlexColumn>
      </Provider>
    )
  }
}

export default App
