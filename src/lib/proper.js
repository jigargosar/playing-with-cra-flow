import {
  compose as proper,
  create,
  map as mapProps,
  withProps as initialProps,
} from 'proppy'
import * as React from 'react'
import { attach } from 'proppy-react'

export { proper, mapProps, initialProps }

export const withProps = mapperFn => {
  return create({
    initialize() {
      this.set(mapperFn(this.props, this.providers))
    },

    handleReceivedProps(parentProps) {
      this.set(mapperFn(parentProps, this.providers))
    },
  })
}

export const attachContext = factory => {
  const { Provider, Consumer } = React.createContext()
  return {
    Consumer,
    Provider: attach(factory)(({ children, ...otherProps }) => (
      <Provider value={otherProps} children={children} />
    )),
  }
}
