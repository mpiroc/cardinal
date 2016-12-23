import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import { DeckContainer, DecksContainer, HomeContainer, MainContainer } from 'containers'
import { Home } from 'components'

export default function getRoutes (history) {
  return (
    <Router history={history}>
      <Router path='/' component={MainContainer}>
        <IndexRoute component={Home} />
        <Route path='/decks' component={DecksContainer} />
        <Route path='/deck/:deckId' component={DeckContainer} />
      </Router>
    </Router>
  )
}
