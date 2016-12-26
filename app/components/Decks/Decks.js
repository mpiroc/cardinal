import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { deckContainer, deckName } from './styles.css'

function Deck (props) {
  // TODO: Do we need to url-escape props.deckId?
  return (
    <div className={deckContainer}>
      <div className={deckName}>
        <Link to={`/deck/${props.deckId}`}>{props.name}</Link>
      </div>
    </div>
  )
}

Deck.propTypes = {
  deckId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default function Decks (props) {
  return props.decks.count() < 1 ? null : (
    <div>{props.decks.keySeq().map(
      deckId => <Deck key={deckId} deckId={deckId} name={props.decks.getIn([deckId, 'name'])} />
    )}</div>
  )
}

Decks.propTypes = {
  decks: PropTypes.object.isRequired
}