import { reinit } from 'typestyle'

reinit()
require('./render')

if (module.hot) {
  module.hot.accept()
}
