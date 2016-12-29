import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router'
import {
  CardsContainer,
  DecksContainer,
  HomeContainer,
  MainContainer,
} from 'containers'
import { Login } from 'components'

export default function getRoutes (history, requireAuth, redirectFromHome) {
  return (
    <Router history={history}>
      <Router path='/' component={MainContainer}>
        <IndexRoute onEnter={redirectFromHome} />
        <Route path='/login' component={Login} />
        <Route path='/decks' component={DecksContainer} onEnter={requireAuth} />
        <Route path='/deck/:deckId' component={CardsContainer} onEnter={requireAuth} />
      </Router>
    </Router>
  )
}
