import { Observable } from '../Observable.js'
import { isPromise } from '../utils/isPromise.js'
import { isArrayLike } from '../utils/isArrayLike.js'

export function innerForm(input) {
  if (input instanceof Observable) {
    return input
  }
  if (isPromise(input)) {
    return fromPromise(input)
  }
  if (isArrayLike(input)) {
    return fromArrayLike(input)
  }
}

export function fromArrayLike(arrayLike) {
  return new Observable((subscriber) => {
    for (let i = 0; i < arrayLike.length; i++) {
      subscriber.next(arrayLike[i])
    }
    subscriber.complete()
  })
}

export function fromPromise(promise) {
  return new Observable((subscriber) => {
    promise.then(
      (value) => {
        subscriber.next(value)
        subscriber.complete()
      },
      (error) => {
        subscriber.error(error)
        subscriber.complete()
      }
    )
  })
}
