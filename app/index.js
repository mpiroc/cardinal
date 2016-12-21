import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory } from 'react-router'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { routerReducer, syncHistoryWithStore } from 'react-router-redux'
import * as reducers from 'redux/modules'
import getRoutes from 'config/routes'
import './styles.css'

const store = createStore(combineReducers({...reducers, routing: routerReducer}), compose(
  applyMiddleware(thunk),
  window.devToolExtension ? window.devToolExtension() : (f) => f
))

const history = syncHistoryWithStore(hashHistory, store)
const routes = getRoutes(history)

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app')
)