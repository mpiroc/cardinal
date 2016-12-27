import React, { PropTypes } from 'react'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';

function Deck({deck}) {
  const name = deck.get('name')
  //const description = deck.get('description')
  //const count = deck.get('count')

  return (
    <Card style={{ width: '350px', margin: '0 1.8rem 1.8rem 0' }}>
      <CardTitle title={name} subtitle={'Placeholder count'} />
      <CardText>{'Placeholder description'}</CardText>
      <CardActions>
        <Button label={'Edit'} />
        <Button label={'Review'} />
      </CardActions>
    </Card>
  )
}

Deck.propTypes = {
  deck: PropTypes.shape({
    get: PropTypes.func.isRequired
  }).isRequired
}

export default function Decks ({decks}) {
  return (
    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>{
      decks.keySeq().map(
        deckId => <Deck key={deckId} deck={decks.get(deckId)} />
      )
    }</div>
  )
}

Decks.propTypes = {
  decks: PropTypes.object.isRequired
}