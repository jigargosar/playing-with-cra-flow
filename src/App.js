import React, {Component} from 'react'
import * as debug from 'debug'
import {FullViewport} from './elements/FullViewport'
import {Flex} from 'reakit'
import {Spacer} from './elements/Spacer'

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
      <FullViewport as={[Flex]} column>
        <Spacer />
        <input autoFocus type="text" onKeyPress={this.handleInputKeyPress} />
      </FullViewport>
    )
  }
}

export default App
