import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import { HomeContainer, MainContainer } from 'containers'

export default function getRoutes (history) {
  return (
    <Router history={history}>
      <Router path='/' component={MainContainer}>
        <IndexRoute component={HomeContainer} />
      </Router>
    </Router>
  )
}
