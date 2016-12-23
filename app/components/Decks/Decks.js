import React, { PropTypes } from 'react'
import { deckContainer } from './styles.css'

function Deck (props) {
  return (
    <div className={deckContainer} key={props.deckId}>{props.name}</div>
  )
}

export default function Decks (props) {
  return (
    <div>{props.decks.valueSeq().map((deck) => Deck(deck))}</div>
  )
}

Decks.propTypes = {
  decks: PropTypes.object.isRequired
}