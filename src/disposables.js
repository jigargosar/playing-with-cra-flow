// @flow
import { once } from 'ramda'
import { hotDispose } from './hmr'

export const addWindowEventListener = (
  eventName: string,
  listener: Function,
  module: Object,
) => {
  window.addEventListener(eventName, listener)
  const disposer = once(() => window.removeEventListener(eventName, listener))
  hotDispose(disposer, module)
  return disposer
}
