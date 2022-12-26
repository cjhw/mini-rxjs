import { Observable } from '../Observable.js'

export function filter(predicate) {
  return (source) => {
    return new Observable(function (subscriber) {
      return source.subscribe({
        ...subscriber,
        next: (value) => {
          predicate(value) && subscriber.next(value)
        },
      })
    })
  }
}
