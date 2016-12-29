import React, { PropTypes } from 'react'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import {
  CardRTCardContainer,
  NewCardRTCardContainer,
} from 'containers'

export default function Cards ({deckId, name, cards}) {
  return (
    <div>
      <div>{
        cards.keySeq().map(
          cardId => <CardRTCardContainer key={cardId} cardId={cardId} />
        )
      }</div>
      <NewCardRTCardContainer deckId={deckId} />
    </div>
  )
}

Cards.propTypes = {
  deckId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  cards: PropTypes.object.isRequired,
}