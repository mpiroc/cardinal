import React from 'react'
import { Router, Route, IndexRoute, Redirect } from 'react-router'
import { DeckContainer, DecksContainer, MainContainer } from 'containers/Material'
import { Home } from 'components/Material'

export default function getRoutes (history, checkAuth) {
  return (
    <Router history={history}>
      <Router path='/' component={MainContainer}>
        <IndexRoute component={Home} onEnter={checkAuth} />
        <Route path='/decks' component={DecksContainer} onEnter={checkAuth} />
        <Route path='/deck/:deckId' component={DeckContainer} onEnter={checkAuth} />
      </Router>
    </Router>
  )
}
