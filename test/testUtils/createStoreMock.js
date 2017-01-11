import { Map } from 'immutable'
import sinon from 'sinon'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import * as reducers from 'redux/modules'

export default function createStoreMock() {
  const setStub = sinon.stub()
  const removeStub = sinon.stub()
  const onStub = sinon.stub()
  const offStub = sinon.stub()
  const pushStub = sinon.stub().returns({
    key: 'myKey',
    set: setStub,
  })
  const childStub = sinon.stub().returns({
    set: setStub,
    remove: removeStub,
    on: onStub,
    off: offStub,
  })

  const allStub = sinon.stub().returns(Promise.resolve())
  
  const firebaseContext = {
    ref: {
      child: childStub
    },
    all: allStub,
  }

  return createStore(
    combineReducers(reducers),
    applyMiddleware(thunk.withExtraArgument(firebaseContext))
  )
}