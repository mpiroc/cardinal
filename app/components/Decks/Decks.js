import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { deckContainer, deckName } from './styles.css'

function Deck (props) {
  // TODO: Do we need to url-escape props.deckId?
  return (
    <div className={deckContainer} key={props.deckId}>
      <div className={deckName}>
        <Link to={`/deck/${props.deckId}`}>{props.name}</Link>
      </div>
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