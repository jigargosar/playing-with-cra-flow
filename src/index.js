if (module.hot) {
  module.hot.accept(() => {
  })
}

require('./render').default()
