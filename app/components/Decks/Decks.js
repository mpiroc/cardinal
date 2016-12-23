import React, { PropTypes } from 'react'
import { deckContainer, deckName } from './styles.css'

function Deck (props) {
  return (
    <div className={deckContainer} key={props.deckId}>
      <div className={deckName}>{props.name}</div>
    </div>
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