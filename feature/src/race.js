import { Subject, switchMap, concatMap, from, mergeMap } from 'rxjs'

function fetchData(id) {
  return from(
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(id)
      }, 1000 * id)
    })
  )
}

const search = new Subject()
// 有新的老的还要按顺序
search.pipe(concatMap(fetchData)).subscribe(console.log)
// 有新的老的还要不过顺序不一定
// search.pipe(mergeMap(fetchData)).subscribe(console.log)
// 上游来了新的老的不要了
// search.pipe(switchMap(fetchData)).subscribe(console.log)

search.next(3)

setTimeout(() => {
  search.next(1)
}, 1000)
