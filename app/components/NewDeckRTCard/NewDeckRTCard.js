import React, { PropTypes } from 'react'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import { FontIcon } from 'react-toolbox/lib/font_icon'
import NewDeckDialogContainer from 'containers/NewDeckDialog/NewDeckDialogContainer'

export default function NewDeckRTCard ({ onOpenDialog }) {
  return (
    <Card style={{ width: '350px', minHeight: '100px', margin: '0 1.8rem 1.8rem 0', justifyContent: 'center' }}>
      <CardText style={{display: 'flex', justifyContent: 'center'}}>
        <Button icon='add_circle_outline' label={'Create New Deck'} onClick={onOpenDialog} />
        <NewDeckDialogContainer />
      </CardText>
    </Card>
  )
}

NewDeckRTCard.propTypes = {
  onOpenDialog: PropTypes.func.isRequired,
}