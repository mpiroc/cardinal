import { Map } from 'immutable'
import sinon from 'sinon'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import * as reducers from 'redux/modules'

export default function createStoreMock() {
  const firebaseContext = {
    ref: {
      child: sinon.stub().returns({
        set: sinon.stub(),
        remove: sinon.stub(),
        on: sinon.stub(),
        off: sinon.stub(),
        once: sinon.stub().returns(Promise.resolve({
          val: sinon.stub().returns({})
        }))
      })
    }
  }

  const store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk.withExtraArgument(firebaseContext))
  )

  store.firebaseContext = firebaseContext

  return store
}
