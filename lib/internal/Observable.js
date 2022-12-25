import { Subscriber } from './Subscriber.js'

export class Observable {
  constructor(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe
    }
  }

  subscribe(observerOrNext) {
    const subscriber = new Subscriber(observerOrNext)
    const teardown = this._subscribe(subscriber)
    subscriber.add(teardown)
    return subscriber
  }
}
