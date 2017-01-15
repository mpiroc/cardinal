import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory } from 'react-router'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { routerReducer, syncHistoryWithStore, routerMiddleware, replace } from 'react-router-redux'
import * as reducers from 'redux/modules'
import { setLoginRedirect } from 'redux/modules/loginRedirect'
import getRoutes from 'config/routes'
import 'react-toolbox/lib/commons.scss'
import firebaseContext from 'config/firebase'

let history = hashHistory

const store = createStore(
  combineReducers({...reducers, routing: routerReducer}),
  compose(
    applyMiddleware(
      thunk.withExtraArgument(firebaseContext),
      routerMiddleware(history),
    ),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
)

history = syncHistoryWithStore(history, store)

function handleEnter(nextState) {
  const destinationPath = nextState.location.pathname
  const isAuthed = store.getState().auth.get('isAuthed')

  if (isAuthed == true && (destinationPath === '/' || destinationPath === '/login')) {
    store.dispatch(replace('/decks'))
  }

  if (isAuthed === false) {
    if (destinationPath === '/') {
      store.dispatch(replace('/login'))
    }
    else if (destinationPath !== '/login') {
      store.dispatch(setLoginRedirect(destinationPath))
      store.dispatch(replace('/login'))
    }
  }
}

const routes = getRoutes(history, handleEnter)

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app')
)