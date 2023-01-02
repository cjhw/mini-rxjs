import {
  filter,
  lastValueFrom,
  merge,
  mergeMap,
  share,
  Subject,
  takeUntil,
  throwIfEmpty,
} from 'rxjs'
import { fromFetch } from 'rxjs/fetch'
import { getUrlFromOptions, getInitFromOptions } from './utils'

class Http {
  cancelRequest = new Subject()
  cancel(requestId) {
    this.cancelRequest.next(requestId)
  }
  request(options) {
    const url = getUrlFromOptions(options)
    const init = getInitFromOptions(options)
    const fetchStream = fromFetch(url, init).pipe(share())
    const successStream = fetchStream.pipe(
      filter((response) => response.ok),
      mergeMap(async (response) => {
        return { data: await response.json(), status: response.status }
      })
    )

    const failStream = fetchStream.pipe(
      filter((response) => !response.ok),
      mergeMap(async (response) => {
        return Promise.reject({
          error: await response.json(),
          status: response.status,
        })
      })
    )

    const mergeStream = merge(successStream, failStream).pipe(
      takeUntil(
        this.cancelRequest.pipe(
          filter((requestId) => options.requestId === requestId)
        )
      ),
      throwIfEmpty(() => ({
        type: 'cancel',
        cacelled: true,
        data: null,
        status: -1,
        statusText: '请求被取消',
        config: options,
      }))
    )

    return lastValueFrom(mergeStream)
  }

  get(url, params, requestId) {
    return this.request({
      method: 'GET',
      url,
      params,
      requestId,
    })
  }

  post(url, data, requestId) {
    console.log(data)
    return this.request({
      method: 'POST',
      url,
      data,
      requestId,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  delete(url, params, requestId) {
    return this.request({
      method: 'DELETE',
      url,
      params,
      requestId,
    })
  }

  put(url, data, requestId) {
    return this.request({
      method: 'PUT',
      url,
      data,
      requestId,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

export const http = new Http()
