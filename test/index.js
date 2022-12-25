import { Observable, of, from } from '../lib/index.js'
// import { of, from } from 'rxjs'

const promiseLikeObservable = from(Promise.resolve(4))

promiseLikeObservable.subscribe({
  next: (value) => {
    console.log(value)
  },
  complete: () => {
    console.log('complete')
  },
})

const arrayLikeObservable = of(1, 2, 3)

arrayLikeObservable.subscribe({
  next: (value) => {
    console.log(value)
  },
  complete: () => {
    console.log('complete')
  },
})
