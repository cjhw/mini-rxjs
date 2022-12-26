import { Observable } from '../Observable.js'

export function take(count) {
  return (source) => {
    let seen = 0
    return new Observable(function (subscriber) {
      return source.subscribe({
        ...subscriber,
        next: (value) => {
          seen++
          if (seen <= count) {
            subscriber.next(value)
            if (seen >= count) {
              subscriber.complete()
            }
          }
        },
      })
    })
  }
}
