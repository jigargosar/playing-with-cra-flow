import React, {Component} from 'react'
import * as debug from 'debug'
import {FullViewport} from './elements/FullViewport'

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
      <FullViewport>
        <input autoFocus type="text" onKeyPress={this.handleInputKeyPress} />
      </FullViewport>
    )
  }
}

export default App
