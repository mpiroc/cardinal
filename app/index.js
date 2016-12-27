import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory } from 'react-router'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
import * as reducers from 'redux/modules'
//import getRoutes from 'config/routes'
import getRoutes from 'config/Material/routes'
import { redirectIfNecessary } from 'helpers/routes'
import 'react-toolbox/lib/commons.scss'

const store = createStore(combineReducers({...reducers, routing: routerReducer}), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f
))

const history = syncHistoryWithStore(hashHistory, store)

function checkAuth(nextState, replace) {
  const isAuthed = store.getState().auth.get('isAuthed')
  const nextPathName = nextState.location.pathname

  redirectIfNecessary(isAuthed, nextPathName, replace)
}

const routes = getRoutes(history, checkAuth)

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app')
)