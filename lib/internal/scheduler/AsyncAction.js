export class AsyncAction {
  // 是否有任务等待执行
  pending = false
  constructor(work) {
    this.work = work
  }

  schedule(state, delay = 0) {
    this.state = state
    this.delay = delay
    if (this.timeID !== null) {
      this.timeID = this.recycleAsyncId(this.timeID)
    }
    this.pending = true
    this.timeID = this.requestAsyncId(delay)
  }

  requestAsyncId(delay = 0) {
    return setInterval(this.execute, delay)
  }

  recycleAsyncId(timeID) {
    if (timeID !== null) {
      clearInterval(timeID)
    }
    return null
  }

  execute = () => {
    this.pending = false
    this.work(this.state)
    if (this.pending === false && this.timeID !== null) {
      this.timeID = this.recycleAsyncId(this.timeID)
    }
  }
}
