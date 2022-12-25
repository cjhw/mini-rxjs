import { Subscriber } from './Subscriber.js'

export class Observable {
  constructor(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe
    }
  }

  subscribe(observerOrNext) {
    const subscriber = new Subscriber(observerOrNext)
    this._subscribe(subscriber)
    return subscriber
  }
}
