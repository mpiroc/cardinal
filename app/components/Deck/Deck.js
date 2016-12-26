import React, { PropTypes } from 'react'
import { CardContainer } from 'containers'

export default function Deck ({name, cards}) {
  return (
    <div>
      <div>{name}</div>
      <div>{
        cards.keySeq().map(
          cardId => <CardContainer key={cardId} cardId={cardId} />
        )
      }</div>
    </div>
  )
}

Deck.propTypes = {
  name: PropTypes.string.isRequired,
  cards: PropTypes.object.isRequired
}