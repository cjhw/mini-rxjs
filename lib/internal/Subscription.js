export class Subscription {
  _finalizers = []
  unsubscribe() {
    const { _finalizers } = this
    for (const finalizer of _finalizers) {
      finalizer()
    }
  }

  add(teardown) {
    this._finalizers.push(teardown)
  }
}
