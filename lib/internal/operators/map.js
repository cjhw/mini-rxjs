import { Observable } from '../Observable.js'

export function map(project) {
  return (source) => {
    return new Observable(function (subscriber) {
      source.subscribe({
        ...subscriber,
        // 最关键重写next
        next: (value) => {
          subscriber.next(project(value))
        },
      })
    })
  }
}
