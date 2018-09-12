import { setupGlobalStyles } from './styles'

setupGlobalStyles()
require('./render')

if (module.hot) {
  module.hot.accept(['./render'], () => {
    require('typestyle').reinit()
    require('./render')
  })
}
