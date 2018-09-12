import { reinit } from './typestyle-exports'

require('./render').default()

if (module.hot) {
  module.hot.accept(() => {
    reinit()
    require('./render').default()
  })
}
