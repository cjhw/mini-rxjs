import { from, mergeMap } from 'rxjs'

const urls = ['user/1', 'user/2', 'user/3']
const start = Date.now()

function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url)
    }, 3000)
  })
}

function multiRequest(urls, concurrent) {
  from(urls)
    .pipe(mergeMap(fetchData, concurrent))
    .subscribe((val) => {
      console.log(`耗时 ${parseInt((Date.now() - start) / 1000)}s`)
      console.log(val)
    })
}

multiRequest(urls, 2)
