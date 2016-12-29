import React, { PropTypes } from 'react'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import { NewCardRTCardContainer } from 'containers'

function FlashCard({card}) {
  const side1 = card.get('side1')
  const side2 = card.get('side2')

  return (
    <div style={{display: 'flex', flexDirection: 'row', margin: '0 0 1.8rem 0'}}>
      <Card style={{ width: '50%' }}>
        <CardText>
          <pre>{side1}</pre>
        </CardText>
        <CardActions>
          <Button label={'Edit'} />
          <Button label={'Delete'} />
        </CardActions>
      </Card>
      <Card style={{ width: '50%' }}>
        <CardText>
          <pre>{side2}</pre>
        </CardText>
      </Card>
    </div>
  )
}

FlashCard.propTypes = {
  card: PropTypes.shape({
    get: PropTypes.func.isRequired
  }).isRequired
}

export default function Cards ({deckId, name, cards}) {
  return (
    <div>
      <div>{
        cards.valueSeq().map(
          card => <FlashCard key={card.cardId} card={card.card} />
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