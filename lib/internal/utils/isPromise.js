import { isFunction } from './isFunction.js'

export function isPromise(value) {
  return isFunction(value.then)
}
