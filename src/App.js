import React, {Component, Fragment} from 'react'
import * as debug from 'debug'

const log = {
  cmd: debug('app:cmd')
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
      <Fragment>
        <input autoFocus type="text" onKeyPress={this.handleInputKeyPress} />
      </Fragment>
    )
  }
}

export default App
