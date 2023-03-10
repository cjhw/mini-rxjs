import {
  Observable,
  of,
  from,
  fromEvent,
  map,
  filter,
  asyncScheduler,
  timer,
  interval,
  take,
  Subject,
} from '../lib/index.js'
// import { of, from, map, filter, asyncScheduler } from 'rxjs'

// const promiseLikeObservable = from(Promise.resolve(4))

// promiseLikeObservable.subscribe({
//   next: (value) => {
//     console.log(value)
//   },
//   complete: () => {
//     console.log('complete')
//   },
// })

// const arrayLikeObservable = of(1, 2, 3)

// arrayLikeObservable.subscribe({
//   next: (value) => {
//     console.log(value)
//   },
//   complete: () => {
//     console.log('complete')
//   },
// })

// const eventObservable = fromEvent(document, 'click')
// const subscriber = eventObservable.subscribe(console.log)

// setTimeout(() => {
//   subscriber.unsubscribe()
// }, 3000)

// of(1, 2, 3)
//   .pipe(map((val) => val * 2))
//   .pipe(filter((val) => val > 3))
//   .pipe(map((val) => val + 1))
//   .subscribe(console.log)

// function task(state) {
//   console.log('state', state)
//   if (state < 5) {
//     this.schedule(state + 1, 1000)
//   }
// }

// asyncScheduler.schedule(task, 1000, 0)

// interval(1000).pipe(take(5)).subscribe(console.log)

const subject = new Subject()

subject.next(1)

subject.subscribe({
  next: (value) => {
    console.log('A', value)
  },
})

subject.next(2)

subject.subscribe({
  next: (value) => {
    console.log('B', value)
  },
})

subject.next(3)
