import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory } from 'react-router'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
import * as reducers from 'redux/modules'
import { setLoginRedirect } from 'redux/modules/loginRedirect'
import getRoutes from 'config/routes'
import 'react-toolbox/lib/commons.scss'
import firebaseContext from 'config/firebase'

const store = createStore(combineReducers({...reducers, routing: routerReducer}), compose(
  applyMiddleware(thunk.withExtraArgument(firebaseContext)),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
))

const history = syncHistoryWithStore(hashHistory, store)

function requireAuth(nextState, replace) {
  const isAuthed = store.getState().auth.get('isAuthed')

  if (isAuthed !== true) {
    store.dispatch(setLoginRedirect(nextState.location.pathname))
    replace('/login')
  }
}

function redirectFromHome(nextState, replace) {
  const isAuthed = store.getState().auth.get('isAuthed')

  if (isAuthed === true) {
    replace('/decks')
  }
  else {
    store.dispatch(setLoginRedirect(nextState.location.pathname))
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