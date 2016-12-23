import React, { PropTypes } from 'react'

export default function Deck (props) {
  return (
    <div>{props.deckId}</div>
  )
}

Deck.propTypes = {
  deckId: PropTypes.string.isRequired,
}