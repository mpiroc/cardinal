import React, { PropTypes } from 'react'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';

function FlashCard({card}) {
  const side1 = card.get('side1')
  const side2 = card.get('side2')

  return (
    <div style={{display: 'flex', flexDirection: 'row', margin: '0 0 1.8rem 0'}}>
      <Card style={{ width: '50%' }}>
        <CardText>{side1}</CardText>
        <CardActions>
          <Button label={'Edit'} />
          <Button label={'Delete'} />
        </CardActions>
      </Card>
      <Card style={{ width: '50%' }}>
        <CardText>{side2}</CardText>
      </Card>
    </div>
  )
}

FlashCard.propTypes = {
  card: PropTypes.shape({
    get: PropTypes.func.isRequired
  }).isRequired
}

export default function Deck ({name, cards}) {
  return (
    <div>{
      cards.keySeq().map(
        cardId => <FlashCard key={cardId} card={cards.get(cardId)} />
      )
    }</div>
  )
}

Deck.propTypes = {
  name: PropTypes.string.isRequired,
  cards: PropTypes.object.isRequired,
}