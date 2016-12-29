import React, { PropTypes } from 'react'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card'
import { Button } from 'react-toolbox/lib/button'
import ProgressBar from 'react-toolbox/lib/progress_bar'
import Delay from 'react-delay'

export default function CardRTCard ({cardId, side1, side2}) {
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

CardRTCard.propTypes = {
  cardId: PropTypes.string.isRequired,
  side1: PropTypes.string.isRequired,
  side2: PropTypes.string.isRequired,
}