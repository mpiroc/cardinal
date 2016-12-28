import React, { PropTypes } from 'react'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card'
import { Button } from 'react-toolbox/lib/button'
import ProgressBar from 'react-toolbox/lib/progress_bar'
import Delay from 'react-delay'

export default function DeckRTCard ({ isDeleting, name, description, onDelete }) {
  return (
    <Card style={{ width: '350px', margin: '0 1.8rem 1.8rem 0' }}>
      <CardTitle title={name} subtitle={'Placeholder count'} />
      <CardText>
        <span>{description}</span>
        {
          // If save completes quickly, we don't want to briefly flash the progress bar. So we
          // wait 250 milliseconds before showing it.
          isDeleting === true ? (
              <Delay wait={250}>
                <div style={{margin: '1.8rem 0 0 0'}}>
                  <ProgressBar type='linear' mode='indeterminate' />
                </div>
              </Delay>
            ) :
            null
        }
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
  isDeleting: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}