import React, { PropTypes } from 'react'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card'
import { Button } from 'react-toolbox/lib/button'
import ProgressBar from 'react-toolbox/lib/progress_bar'
import Delay from 'react-delay'
import { MarkdownViewer } from 'components'
import { EditCardDialogContainer } from 'containers'

export default function CardRTCard ({
  cardId,
  isDeleting,
  side1,
  side2,
  onEdit,
  onDelete,
}) {
  return (
    <div style={{display: 'flex', flexDirection: 'row', margin: '0 0 1.8rem 0'}}>
      <Card style={{ width: '50%' }}>
        <CardText>
          <MarkdownViewer markdown={side1} />
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
          <Button label={'Edit'} onClick={onEdit} />
          <EditCardDialogContainer />

          <Button label={'Delete'} onClick={onDelete} />
        </CardActions>
      </Card>
      <Card style={{ width: '50%' }}>
        <CardText>
          <MarkdownViewer markdown={side2} />
        </CardText>
      </Card>
    </div>
  )
}

CardRTCard.propTypes = {
  cardId: PropTypes.string.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  side1: PropTypes.string.isRequired,
  side2: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}