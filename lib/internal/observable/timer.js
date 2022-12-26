import { asyncScheduler } from '../scheduler/async.js'
import { Observable } from '../Observable.js'
import { Scheduler } from '../Scheduler.js'

export function timer(
  dueTime = 0,
  intervalScheduler,
  scheduler = asyncScheduler
) {
  let intervalDuration = -1
  if (intervalDuration !== null) {
    if (intervalScheduler instanceof Scheduler) {
      scheduler = intervalScheduler
    } else {
      intervalDuration = intervalScheduler
    }
  }

  return new Observable((subscriber) => {
    let n = 0
    return scheduler.schedule(function () {
      subscriber.next(n++)
      if (intervalDuration > 0) {
        this.schedule(undefined, intervalDuration)
      } else {
        subscriber.complete()
      }
    }, dueTime)
  })
}
