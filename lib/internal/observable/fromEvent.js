import { Observable } from '../Observable.js'

export function fromEvent(target, eventName) {
  return new Observable((subscriber) => {
    const handler = (...args) => subscriber.next(...args)
    target.addEventListener(eventName, handler)
    return () => {
      target.removeEventListener(eventName, handler)
    }
  })
}
