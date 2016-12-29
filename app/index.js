import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory } from 'react-router'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
import * as reducers from 'redux/modules'
import getRoutes from 'config/routes'
import 'react-toolbox/lib/commons.scss'

const store = createStore(combineReducers({...reducers, routing: routerReducer}), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
))

const history = syncHistoryWithStore(hashHistory, store)

function requireAuth(nextState, replace) {
  const isAuthed = store.getState().auth.get('isAuthed')

  if (isAuthed !== true) {
    replace('/login')
  }
}

function redirectFromHome(nextState, replace) {
  const isAuthed = store.getState().auth.get('isAuthed')

  if (isAuthed === true) {
    replace('/decks')
  }
  else {
    replace('/login')
  }
}

const routes = getRoutes(history, requireAuth, redirectFromHome)

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app')
)