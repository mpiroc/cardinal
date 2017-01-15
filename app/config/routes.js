import React from 'react'
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router'
import CardsContainer from 'containers/Cards/CardsContainer'
import DecksContainer from 'containers/Decks/DecksContainer'
import MainContainer from 'containers/Main/MainContainer'
import ReviewContainer from 'containers/Review/ReviewContainer'
import Login from 'components/Login/Login'

export default function getRoutes (history, onEnter) {
  return (
    <Router history={history}>
      <Router path='/' component={MainContainer}>
        <IndexRoute onEnter={onEnter} />
        <Route path='/login' component={Login} onEnter={onEnter} />
        <Route path='/decks' component={DecksContainer} onEnter={onEnter} />
        <Route path='/deck/:deckId' component={CardsContainer} onEnter={onEnter} />
        <Route path='/review/:deckId' component={ReviewContainer} onEnter={onEnter} />
      </Router>
    </Router>
  )
}
