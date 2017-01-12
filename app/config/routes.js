import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router'
import CardsContainer from 'containers/Cards/CardsContainer'
import DecksContainer from 'containers/Decks/DecksContainer'
import MainContainer from 'containers/Main/MainContainer'
import ReviewContainer from 'containers/Review/ReviewContainer'
import Login from 'components/Login/Login'

export default function getRoutes (history, requireAuth, redirectFromHome) {
  return (
    <Router history={history}>
      <Router path='/' component={MainContainer}>
        <IndexRoute onEnter={redirectFromHome} />
        <Route path='/login' component={Login} />
        <Route path='/decks' component={DecksContainer} onEnter={requireAuth} />
        <Route path='/deck/:deckId' component={CardsContainer} onEnter={requireAuth} />
        <Route path='/review/:deckId' component={ReviewContainer} onEnter={requireAuth} />
      </Router>
    </Router>
  )
}
