import { reinit } from 'typestyle'

if (module.hot) {
  reinit()
  module.hot.accept()
}

require('./render')
