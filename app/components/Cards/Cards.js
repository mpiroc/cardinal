import React, { PropTypes } from 'react'
import {
  CardRTCardContainer,
  NewCardRTCardContainer,
  CardsSnackbarContainer,
} from 'containers'

export default function Cards ({ deckId, cards }) {
  return (
    <div>
      <div>{
        cards.keySeq().map(
          cardId => <CardRTCardContainer key={cardId} deckId={deckId} cardId={cardId} />
        )
      }</div>
      <NewCardRTCardContainer deckId={deckId} />
      <CardsSnackbarContainer />
    </div>
  )
}

Cards.propTypes = {
  deckId: PropTypes.string.isRequired,
  cards: PropTypes.object.isRequired,
}