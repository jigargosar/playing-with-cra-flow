import {
  compose as proper,
  create,
  map as mapProps,
  withProps as initialProps,
} from 'proppy'

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
