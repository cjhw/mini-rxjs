import { isFunction } from './utils/isFunction.js'

export class Subscriber {
  isStopped = false
  constructor(observerOrNext) {
    let observer
    if (isFunction(observerOrNext)) {
      observer = {
        next: observerOrNext,
      }
    } else {
      observer = observerOrNext
    }
    this.destination = observer
  }

  next(value) {
    if (!this.isStopped) {
      this.destination.next(value)
    }
  }

  complete() {
    if (!this.isStopped) {
      this.isStopped = true
      this.destination.complete?.()
    }
  }
}
