import { Observable } from './Observable.js'

export class Subject extends Observable {
  subscribers = []
  subscribe(subscriber) {
    this.subscribers.push(subscriber)
  }
  next(value) {
    for (const subscriber of this.subscribers) {
      subscriber.next(value)
    }
  }
}
