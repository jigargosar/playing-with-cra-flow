import { reinit } from './typestyle-exports'

reinit()
require('./render')

if (module.hot) {
  module.hot.accept(() => {
    // require('./render')
  })
}
