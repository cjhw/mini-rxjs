import { Subscriber } from './Subscriber.js'
import { pipeFromArray } from './utils/pipe.js'

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

  pipe(...operations) {
    // 老的Observable返回心的Observable
    // return operation(this)
    return pipeFromArray(operations)(this)
  }
}
