import React, { PropTypes } from 'react'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import { FontIcon } from 'react-toolbox/lib/font_icon'
import NewCardDialogContainer from 'containers/NewCardDialog/NewCardDialogContainer'

export default function NewCardRTCard ({ onOpenDialog }) {
  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <Card style={{ width: '50%', minHeight: '100px', margin: '0 1.8rem 1.8rem 0', justifyContent: 'center' }}>
        <CardText style={{display: 'flex', justifyContent: 'center'}}>
          <Button icon='add_circle_outline' label={'Create New Card'} onClick={onOpenDialog} />
          <NewCardDialogContainer />
        </CardText>
      </Card>
    </div>
  )
}

NewCardRTCard.propTypes = {
  onOpenDialog: PropTypes.func.isRequired,
}