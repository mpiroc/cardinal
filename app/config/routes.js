import React from 'react'
import { Router, Route, IndexRoute, Redirect } from 'react-router'
import {
  CardsContainer,
  DecksContainer,
  MainContainer
} from 'containers'
import { Home } from 'components'

export default function getRoutes (history, checkAuth) {
  return (
    <Router history={history}>
      <Router path='/' component={MainContainer}>
        <IndexRoute component={Home} onEnter={checkAuth} />
        <Route path='/decks' component={DecksContainer} onEnter={checkAuth} />
        <Route path='/deck/:deckId' component={CardsContainer} onEnter={checkAuth} />
      </Router>
    </Router>
  )
}
