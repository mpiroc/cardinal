import { Map } from 'immutable'
import sinon from 'sinon'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import * as reducers from 'redux/modules'

export default function createStoreMock() {
  const set = sinon.stub()
  const remove = sinon.stub()
  const on = sinon.stub()
  const off = sinon.stub()
  const val = sinon.stub().returns({})
  const once = sinon.stub().returns(Promise.resolve({ val }))
  const child = sinon.stub().returns({
    set,
    remove,
    on,
    off,
    once,
  })

  const firebaseContext = {
    ref: { child },
    stubs: {
      child,
      set,
      remove,
      on,
      off,
      once,
      val,
    }
  }

  const store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk.withExtraArgument(firebaseContext))
  )

  store.firebaseContext = firebaseContext

  return store
}
