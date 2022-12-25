import { Observable } from '../lib/index.js'

const observable = new Observable((subscribe) => {
  subscribe.next(1)
  subscribe.next(2)
  subscribe.next(3)
  subscribe.complete()
})

const observer = {
  next: (value) => {
    console.log(`next value:`, value)
  },
  error: (error) => {
    console.log(error)
  },
  complete: () => {
    console.log('complete')
  },
}

observable.subscribe(observer)
