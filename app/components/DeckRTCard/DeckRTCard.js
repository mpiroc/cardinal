import React, { PropTypes } from 'react'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';

export default function DeckRTCard ({ isDeleting, name, description, onDelete }) {
  return (
    <Card style={{ width: '350px', margin: '0 1.8rem 1.8rem 0' }}>
      <CardTitle title={name} subtitle={'Placeholder count'} />
      <CardText>
        <span>{description}</span>
        <span>{`(TODO: Replace with progress bar) isDeleting: ${isDeleting}`}</span>
      </CardText>
      <CardActions>
        <Button label={'View'} />
        <Button label={'Edit'} />
        <Button label={'Delete'} onClick={onDelete} />
      </CardActions>
    </Card>
  )
}

DeckRTCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}