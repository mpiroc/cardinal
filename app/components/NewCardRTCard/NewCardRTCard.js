import React, { PropTypes } from 'react'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import { FontIcon } from 'react-toolbox/lib/font_icon'
import { NewCardDialogContainer } from 'containers'

export default function NewCardRTCard ({ onOpenDialog }) {
  return (
    <Card style={{ width: '50%', minHeight: '100px', margin: '0 1.8rem 1.8rem 0', justifyContent: 'center' }}>
      <CardText style={{display: 'flex', justifyContent: 'center'}}>
        <Button icon='add_circle_outline' label={'Create New Card'} onClick={onOpenDialog} />
        <NewCardDialogContainer />
      </CardText>
    </Card>
  )
}

NewCardRTCard.propTypes = {
  onOpenDialog: PropTypes.func.isRequired,
}