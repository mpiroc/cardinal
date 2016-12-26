import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import { DeckContainer, DecksContainer, HomeContainer, MainContainer } from 'containers'
import { Home } from 'components'

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
