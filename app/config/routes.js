import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import { DecksContainer, HomeContainer, MainContainer } from 'containers'

export default function getRoutes (history) {
  return (
    <Router history={history}>
      <Router path='/' component={MainContainer}>
        <IndexRoute component={HomeContainer} />
        <Route path='/decks' component={DecksContainer} />
      </Router>
    </Router>
  )
}
